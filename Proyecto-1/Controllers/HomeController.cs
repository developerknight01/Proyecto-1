using Microsoft.AspNetCore.Mvc;
using Proyecto_1.Models;
using System.Diagnostics;
using static System.Net.Mime.MediaTypeNames;
using System.Data;
using System.Data.SqlClient;

namespace Proyecto_1.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }
        [HttpPost]
        public ActionResult GetNewBooks(string a)
        {
            string result = new StoreProcedure().getNewBooks();
            return Json(result);
        }
        public IActionResult Index()
        {
            
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}