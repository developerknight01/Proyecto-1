namespace Proyecto_1.CDomain
{
    public class Books
    {
        private string isbn;
        private string name;
        private int edition;
        private string editorial;
        private string nameOwner;
        private string stock;
        public Books()
        {
            this.isbn = string.Empty;
            this.name = string.Empty;
            this.edition = 0;
            this.editorial = string.Empty;
            this.nameOwner = string.Empty;
            this.stock = string.Empty;
        }
        public Books(string isbn, string name, int edition, string editorial, string nameOwner, string stock)
        {
            this.Isbn = isbn;
            this.Name = name;
            this.Edition = edition;
            this.NameOwner = nameOwner;
            this.Stock = stock;
        }

        public string Isbn { get => isbn; set => isbn = value; }
        public string Name { get => name; set => name = value; }
        public int Edition { get => edition; set => edition = value; }
        public string Editorial { get => editorial; set => editorial = value; }
        public string NameOwner { get => nameOwner; set => nameOwner = value; }
        public string Stock { get => stock; set => stock = value; }
    }
}
