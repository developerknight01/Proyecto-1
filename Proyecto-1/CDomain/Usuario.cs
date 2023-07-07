namespace Proyecto_1.CDomain
{
    public class Usuario
    {
        private string id;
        private string name;
        private string lastname;
        private string date;
        private bool status;
        private string password;
        public Usuario()
        {

        }
        public Usuario(string id, string name, string lastname, string date,bool status, string password)
        {
            this.Id = id;
            this.Name = name;
            this.Lastname = lastname;   
            this.Date = date;
            this.Status = status;
            this.Password = password;
        }

        public string Id { get => id; set => id = value; }
        public string Name { get => name; set => name = value; }
        public string Lastname { get => lastname; set => lastname = value; }
        public string Date { get => date; set => date = value; }
        public bool Status { get => status; set => status = value; }
        public string Password { get => password; set => password = value; }
    }
}
