using OrderMicroservice.Data;
using OrderMicroservice.Models;
using System.Collections.Generic;
using System.Linq;

namespace OrderMicroservice.Services
{
    public class OrderService
    {
        private readonly ApplicationDbContext _context;

        public OrderService(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<Order> GetOrders()
        {
            return _context.Orders.ToList();
        }

        public Order GetOrderById(string id)
        {
            return _context.Orders.FirstOrDefault(o => o.Id == id);
        }

        public Order PlaceOrder(Order order)
        {
            
            if (string.IsNullOrEmpty(order.Id))
            {
                order.Id = System.Guid.NewGuid().ToString();
            }

            
            if (order.OrderDate == default)
            {
                order.OrderDate = System.DateTime.UtcNow;
            }

            _context.Orders.Add(order);
            _context.SaveChanges();
            return order;
        }
    }
}