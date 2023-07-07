using Microsoft.AspNetCore.Mvc.Infrastructure;
using Proyecto_1.CDomain;
using System.Data;
using System.Data.SqlClient;
namespace Proyecto_1.Controllers
{
    public class StoreProcedure
    {
        SqlConnection con;
        public StoreProcedure() {
            con = new SqlConnection("Data Source = DK-G\\SQLEXPRESS; initial Catalog = db_bookstore; Integrated Security = true");
        }
        public string CheckBookReturned(string userID)
        {
            string result = "";
            try
            {
                con.Open();
                SqlCommand com = con.CreateCommand();
                com.Connection = con;
                com.CommandType = CommandType.StoredProcedure;
                com.CommandText = "checkBookReturned";
                com.Parameters.AddWithValue("userID",userID);
                SqlDataReader reader = com.ExecuteReader();
                if (reader.HasRows)
                {
                    while (reader.Read())
                    {
                        if (reader.GetString(0) != "empty")
                        {
                            result += Convert.ToString(reader.GetInt32(1)) + "+" + Convert.ToString(reader.GetDateTime(2)) + "*";
                        }
                        else
                            result = "empty";
                    }
                }
            }
            catch (Exception ex)
            {
                //result = ex.ToString();
                result = "error";
            }
            finally { con.Close(); }
            return result;
        }
        public string ReturnBook(string idTransaction,string user)
        {
            string result = "";
            try
            {
                con.Open();
                SqlCommand com = con.CreateCommand();
                com.Connection = con;
                com.CommandType = CommandType.StoredProcedure;
                com.CommandText = "returnBook";
                com.Parameters.AddWithValue("idTransact",idTransaction);
                com.Parameters.AddWithValue("date", DateTime.UtcNow);
                result = Convert.ToString(com.ExecuteNonQuery());
            }
            catch (Exception ex)
            {
                //result = ex.ToString();
                result = "error";
            }
            finally { con.Close(); }
            return result;
        }
        public string CheckBooksOrdered(string userID)
        {
            string result = "";
            try
            {
                con.Open();
                SqlCommand com = con.CreateCommand();
                com.Connection = con;
                com.CommandType = CommandType.StoredProcedure;
                com.CommandText = "checkBooksOrdered";
                com.Parameters.AddWithValue("userID",userID);
                SqlDataReader reader = com.ExecuteReader();
                if (reader.HasRows)
                {
                    while (reader.Read())
                    {
                        if(reader.GetString(0) != "empty")
                        {
                            result += reader.GetString(0) + "+" + reader.GetString(1) + "+" + reader.GetString(2) + "+" + reader.GetString(3) + "+";
                            result += Convert.ToString(reader.GetDateTime(4)) + "+" + Convert.ToString(reader.GetBoolean(5)) + "+" + Convert.ToString(reader.GetDateTime(6)) + "+";
                            result += Convert.ToString(reader.GetInt32(7)) + "*";
                        }                        
                        else
                            result = "empty";
                    }
                }
            }
            catch (Exception ex)
            {
                //result = ex.ToString();
                result = "error";
            }
            finally { con.Close(); }
            return result;
        }
        public string OrderBook(string isbn, string userID, string dateEnd, string dateStart)
        {
            string result = "";
            try
            {
                con.Open();
                SqlCommand com = con.CreateCommand();
                com.Connection = con;
                com.CommandType = CommandType.StoredProcedure;
                com.CommandText = "orderBook";
                com.Parameters.AddWithValue("isbn",isbn);
                com.Parameters.AddWithValue("idPartner",userID);
                com.Parameters.AddWithValue("dateStart",dateStart);
                com.Parameters.AddWithValue("dateFinish",dateEnd);
                SqlDataReader reader = com.ExecuteReader();
                if (reader.HasRows)
                {
                    while (reader.Read())
                        result = reader.GetString(0);
                }
            }
            catch (Exception ex)
            {
                //result = ex.ToString();
                result = "error";
            }
            finally { con.Close(); }
            return result;
        }
        public string FindBook(string isbn)
        {
            string result = "";
            try
            {
                con.Open();
                SqlCommand com = con.CreateCommand();
                com.Connection = con;
                com.CommandType = CommandType.StoredProcedure;
                com.CommandText = "findBook";
                com.Parameters.AddWithValue("isbn", isbn);
                SqlDataReader reader = com.ExecuteReader();
                if (reader.HasRows)
                {
                    while (reader.Read())
                    {
                        if (reader.GetString(0) != "fail")
                        {
                            result = reader.GetString(0) + "+" + reader.GetString(1) + "+" + reader.GetString(2) + "+" + reader.GetString(3);
                        }
                        else
                            result = "fail";
                    }                        
                }             
            }
            catch(Exception ex)
            {
                //result = ex.ToString();
                result = "error";
            }
            finally { con.Close(); }
            return result;
        }
        public string CheckBooksOrderHave(string userID)
        {
            string result = "";
            try
            {
                con.Open();
                SqlCommand com = con.CreateCommand();
                com.Connection = con;
                com.CommandType = CommandType.StoredProcedure;
                com.CommandText = "checkBooksOrderHave";
                com.Parameters.AddWithValue("userID",userID);
                SqlDataReader reader = com.ExecuteReader();
                if (reader.HasRows)
                {
                    while (reader.Read())
                        result = Convert.ToString(reader.GetInt32(0));
                }
            }
            catch (Exception ex)
            {
                //result = ex.ToString();
                result = "error";
            }
            finally { con.Close(); }
            return result;
        }
        public string UpdateOwnInfo(string kindOfData, string value, string userID)
        {
            string result = "";
            try
            {
                con.Open();
                SqlCommand com = con.CreateCommand();
                com.Connection = con;
                com.CommandType = CommandType.StoredProcedure;
                com.CommandText = "updateOwnInfo";
                com.Parameters.AddWithValue("kindOfData",kindOfData);
                com.Parameters.AddWithValue("userID", userID);
                com.Parameters.AddWithValue("value",value);
                com.Parameters.AddWithValue("oldValue",userID);
                com.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                //result = ex.ToString();
                result = "";
            }
            finally { con.Close(); }
            return result;
        }
        public string OwnInfo(string idUser)
        {
            string result = "";
            try
            {
                con.Open();
                SqlCommand com = con.CreateCommand();
                com.Connection = con;
                com.CommandType = CommandType.StoredProcedure;
                com.CommandText = "ownInfo";
                com.Parameters.AddWithValue("userID",idUser);
                SqlDataReader reader = com.ExecuteReader();
                if (reader.HasRows)
                {
                    while (reader.Read())
                        result = reader.GetString(0) + "+" + reader.GetString(1) + "+" + reader.GetString(2);
                }
            }
            catch (Exception ex) {
                //result = ex.ToString();
                result = "error";
            }
            finally { con.Close(); }
            return result;
        }
        public string Login(Usuario user)
        {
            string result = "";
            try
            {
                con.Open();
                SqlCommand com = con.CreateCommand();
                com.Connection = con;
                com.CommandType = CommandType.StoredProcedure;
                com.CommandText = "login";
                com.Parameters.AddWithValue("id", user.Id);
                com.Parameters.AddWithValue("pass", user.Password);
                SqlDataReader reader = com.ExecuteReader();
                if (reader.HasRows)
                {
                    while (reader.Read())
                        result = reader.GetString(0);
                }
            }
            catch (Exception ex)
            {
                //result = ex.ToString();
                result = "";
            }
            finally
            {
                con.Close();
            }
            return result;
        }
        public string CheckUserExist(Usuario user)
        {
            string result = "";
            try
            {
                con.Open();
                SqlCommand com = con.CreateCommand();
                com.Connection = con;
                com.CommandType = CommandType.StoredProcedure;
                com.CommandText = "checkuserexist";
                com.Parameters.AddWithValue("id",user.Id);
                SqlDataReader reader = com.ExecuteReader();
                if (reader.HasRows)
                {
                    while (reader.Read())
                        result = reader.GetString(0);
                }
            }
            catch (Exception ex)
            {
                //result = ex.ToString();
                result = "error";
            }
            finally
            {
                con.Close();
            }
            return result;
        }
        public string SignUp(Usuario user)
        {
            string result = "";
            try
            {
                con.Open();
                SqlCommand com = con.CreateCommand();
                com.Connection = con;
                com.CommandType = CommandType.StoredProcedure;
                com.CommandText = "signup";
                com.Parameters.AddWithValue("id",user.Id);
                com.Parameters.AddWithValue("name", user.Name);
                com.Parameters.AddWithValue("lastname", user.Lastname);
                com.Parameters.AddWithValue("registered", user.Date);
                com.Parameters.AddWithValue("pass", user.Password);
                result = Convert.ToString(com.ExecuteNonQuery());                

            }
            catch (Exception ex)
            {
                //result = ex.ToString();
                result = "error";
            }
            con.Close();
            return result;
        }
        public string getAllBooks()
        {
            string result = "";
            try
            {
                con.Open();
                SqlCommand com = con.CreateCommand();
                com.Connection = con;
                com.CommandType = CommandType.StoredProcedure;
                com.CommandText = "getAllBook";
                com.ExecuteNonQuery();
                SqlDataReader reader = com.ExecuteReader();
                if (reader.HasRows)
                {
                    while (reader.Read())
                    {
                        result += reader.GetString(0) + "+" + reader.GetString(1) + "+" + reader.GetString(2) + "+" + reader.GetString(3) + "+";
                        result += reader.GetString(4) + "+" + Convert.ToString(reader.GetInt32(5)) + "+" + reader.GetString(6) + "*";
                    }
                }

            }
            catch (Exception ex)
            {
                //result = ex.ToString();
                result = "error";
            }
            con.Close();
            return result;
        }
        public string getNewBooks()
        {
            string result = "";
            try
            {                
                con.Open();
                SqlCommand com = con.CreateCommand();
                com.Connection = con;
                com.CommandType = CommandType.StoredProcedure;
                com.CommandText = "checknewbooks";
                com.ExecuteNonQuery();
                SqlDataReader reader = com.ExecuteReader();
                if (reader.HasRows)
                {
                    while (reader.Read())
                    {
                        result += Convert.ToString(reader.GetInt32(0)) + "+" + reader.GetString(1) + "+" + reader.GetString(2) + "+" + reader.GetString(3) + "*";
                    }
                }

            }
            catch (Exception ex)
            {
                //result = ex.ToString();
                result = "error";
            }
            con.Close();
            return result;
        }
    }
}
