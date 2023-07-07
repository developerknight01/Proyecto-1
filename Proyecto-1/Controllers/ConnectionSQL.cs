using System.Data.SqlClient;

namespace Proyecto_1.Controllers
{
    public class ConnectionSQL
    {
        public ConnectionSQL() { } 
        public SqlConnection stringConnection()
        {
            return new SqlConnection("Data Source = DK-G\\SQLEXPRESS; initial Catalog = db_bookstore; Integrated Security = true");
        }
        
    }
}
