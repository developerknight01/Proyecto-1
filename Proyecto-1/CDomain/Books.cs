namespace Proyecto_1.CDomain
{
    public class Books
    {
        private string isbn;
        private string name;
        private string edition;
        private string editorial;
        private string nameOwner;
        private string stock;
        private string itemLoan;
        public Books()
        {
            this.isbn = string.Empty;
            this.name = string.Empty;
            this.edition = string.Empty;
            this.editorial = string.Empty;
            this.nameOwner = string.Empty;
            this.stock = string.Empty;
            this.itemLoan = string.Empty;
        }
        public Books(string isbn, string name, string edition, string editorial, string nameOwner, string stock,string itemLoan)
        {
            this.Isbn = isbn;
            this.Name = name;
            this.Edition = edition;
            this.Editorial = editorial;
            this.NameOwner = nameOwner;
            this.Stock = stock;
            this.itemLoan= itemLoan;
        }

        public string Isbn { get => isbn; set => isbn = value; }
        public string Name { get => name; set => name = value; }
        public string Edition { get => edition; set => edition = value; }
        public string Editorial { get => editorial; set => editorial = value; }
        public string NameOwner { get => nameOwner; set => nameOwner = value; }
        public string Stock { get => stock; set => stock = value; }
        public string ItemLoan { get => itemLoan; set => itemLoan = value; }
        public string toString()
        {
            return this.isbn + " " + this.Name + " " + this.edition + " " + this.editorial + " " + this.nameOwner + " " + this.stock + " " + this.itemLoan;
        }
    }
}
