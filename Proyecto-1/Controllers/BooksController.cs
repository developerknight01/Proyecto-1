using Microsoft.AspNetCore.Mvc;
using System.Security.Cryptography;
using System.Text;

namespace Proyecto_1.Controllers
{
    public class BooksController : Controller
    {
        public string Decrypt(string value)
        {
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
        public IActionResult Index()
        {
            return View();
        }
        public IActionResult Books()
        {
            return View();
        }
        public IActionResult ModalBook()
        {
            return View();
        }
        [HttpGet]
        public ActionResult GetAllBooks()
        {
            string result = new StoreProcedure().getAllBooks();
            return Json(result);
        }
        [HttpPost]
        public ActionResult CheckBooksOrderHave(string userID)
        {
            string user = Decrypt(userID);
            return Json(new StoreProcedure().CheckBooksOrderHave(user));
        }
        [HttpPost]
        public ActionResult FindBook(string bookID)
        {
            return Json(new StoreProcedure().FindBook(bookID));
        }
        [HttpPost]
        public ActionResult OrderBook(string userID, string bookID, string inputDate) { 
            string id = Decrypt(userID);
            return Json(new StoreProcedure().OrderBook(bookID, id, inputDate, Convert.ToString(DateTime.UtcNow)));
        }
    }
}
