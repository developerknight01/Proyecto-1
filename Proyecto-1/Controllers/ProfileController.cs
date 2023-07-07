using Microsoft.AspNetCore.Mvc;
using System.Security.Cryptography;
using System.Text;

namespace Proyecto_1.Controllers
{
    public class ProfileController : Controller
    {
        public string Decrypt(string value){
            try
            {
                string textToDecrypt = value;
                string ToReturn = "";
                string publickey = "12345678";
                string secretkey = "87654321";
                byte[] privatekeyByte = { };
                privatekeyByte = System.Text.Encoding.UTF8.GetBytes(secretkey);
                byte[] publickeybyte = { };
                publickeybyte = System.Text.Encoding.UTF8.GetBytes(publickey);
                MemoryStream ms = null;
                CryptoStream cs = null;
                byte[] inputbyteArray = new byte[textToDecrypt.Replace(" ", "+").Length];
                inputbyteArray = Convert.FromBase64String(textToDecrypt.Replace(" ", "+"));
                using (DESCryptoServiceProvider des = new DESCryptoServiceProvider())
                {
                    ms = new MemoryStream();
                    cs = new CryptoStream(ms, des.CreateDecryptor(publickeybyte, privatekeyByte), CryptoStreamMode.Write);
                    cs.Write(inputbyteArray, 0, inputbyteArray.Length);
                    cs.FlushFinalBlock();
                    Encoding encoding = Encoding.UTF8;
                    ToReturn = encoding.GetString(ms.ToArray());
                }
                return ToReturn;
            }
            catch (Exception ae)
            {
                throw new Exception(ae.Message, ae.InnerException);
            }
        }
        public string Encrypt(string value)
        {
            try
            {
                string textToEncrypt = value;
                string ToReturn = "";
                string publickey = "12345678";
                string secretkey = "87654321";
                byte[] secretkeyByte = { };
                secretkeyByte = System.Text.Encoding.UTF8.GetBytes(secretkey);
                byte[] publickeybyte = { };
                publickeybyte = System.Text.Encoding.UTF8.GetBytes(publickey);
                MemoryStream ms = null;
                CryptoStream cs = null;
                byte[] inputbyteArray = System.Text.Encoding.UTF8.GetBytes(textToEncrypt);
                using (DESCryptoServiceProvider des = new DESCryptoServiceProvider())
                {
                    ms = new MemoryStream();
                    cs = new CryptoStream(ms, des.CreateEncryptor(publickeybyte, secretkeyByte), CryptoStreamMode.Write);
                    cs.Write(inputbyteArray, 0, inputbyteArray.Length);
                    cs.FlushFinalBlock();
                    ToReturn = Convert.ToBase64String(ms.ToArray());
                }
                return ToReturn;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex.InnerException);
            }
        }
        public IActionResult Profile()
        {
            return View();
        }
        public IActionResult Info() {
            return View();
        }
        public IActionResult OrderBook()
        {
            return View();
        }
        public IActionResult BookStore() {
            return View();
        }
        [HttpPost]
        public ActionResult OwnInfo(string idUser)
        {
            idUser = Decrypt(idUser);
            return Json(new StoreProcedure().OwnInfo(idUser));
        }
        [HttpPost]
        public ActionResult UpdateData(string kindOfData, string value, string userID)
        {
            string userIDTemp = Decrypt(userID);
            string result = new StoreProcedure().UpdateOwnInfo(kindOfData, value, userIDTemp);
            if (kindOfData == "tbID")
            {
                userIDTemp = Encrypt(value);
                return Json(userIDTemp);
            }
            else
            {                
                return Json(result);
            }                
                        
        }
        [HttpPost]
        public ActionResult CheckBooksOrdered(string userID){
            string user = Decrypt(userID);
            return Json(new StoreProcedure().CheckBooksOrdered(user));            
        }
        [HttpPost]
        public ActionResult ReturnBook(string idTransaction, string userID){
            string user = Decrypt(userID);
            return Json(new StoreProcedure().ReturnBook(idTransaction,user));

        }
        [HttpPost]
        public ActionResult CheckBookReturned(string userID)
        {
            string user = Decrypt(userID);
            return Json(new StoreProcedure().CheckBookReturned(user));
        }
    }
}
