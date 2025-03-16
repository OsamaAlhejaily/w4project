using ProductService.Data;
using ProductService.Models;

namespace ProductService.Services
{
    public class ProductServices
    {
        private readonly ApplicationDbContext _context;

        public ProductServices(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<Product> GetProducts()
        {
            return _context.Products.ToList();
        }

        public Product GetProductById(string id)
        {
            return _context.Products.FirstOrDefault(p => p.Id == id);
        }

        public Product AddProduct(Product product)
        {
            
            if (string.IsNullOrEmpty(product.Id))
            {
                product.Id = System.Guid.NewGuid().ToString();
            }

            _context.Products.Add(product);
            _context.SaveChanges();
            return product;
        }

        public void DeleteProduct(string id)
        {
            var product = _context.Products.FirstOrDefault(p => p.Id == id);
            if (product != null)
            {
                _context.Products.Remove(product);
                _context.SaveChanges();
            }
        }
    }
}