using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore;
using Proyecto_1.CDomain;
using System.Text;
using System.Web;
using System.Security.Cryptography;
using System.Data.SqlTypes;
using System.Diagnostics;
using System;

namespace Proyecto_1.Controllers
{
    public class AccountController : Controller
    {
        public string Encrypt(string value){
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
        public IActionResult Account()
        {
            return View();            
        }        
        public IActionResult Restore() { 
        
            return View();
        }
        public IActionResult SignUp()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Login(string user, string pass)
        {
            string result = "";            
            Usuario usuario = new Usuario();            
            usuario.Id = user;
            usuario.Password = pass;
            result = new StoreProcedure().Login(usuario);
            if(result != "fail" && result != "error")
            {
                if (usuario.Id == "111111111")
                    return Json(Encrypt(usuario.Id)+"~01");
                else
                    return Json(Encrypt(usuario.Id));
            }
            else
            {
                return Json(result);
            }

        }
        [HttpPost]
        public ActionResult NewUser(string id,string name,string lastname, string password)
        {
            Usuario user = new Usuario();
            string result = "";
            user.Id = id;
            user.Name = name;
            user.Lastname = lastname;
            user.Date = Convert.ToString(DateTime.UtcNow);
            user.Password = password;
            result = new StoreProcedure().CheckUserExist(user);
            if (result == "none")
            {
                return Json(new StoreProcedure().SignUp(user));
            }
            else
            {
                return Json(result);
            }
        }
    }
}
