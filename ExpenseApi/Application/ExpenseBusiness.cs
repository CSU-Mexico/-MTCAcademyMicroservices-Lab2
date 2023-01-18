using Dapr.Client;
using ExpenseApi.Data;
using ExpenseApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System.Net.NetworkInformation;
using System.Text;

namespace ExpenseApi.Application
{
    public class ExpenseBusiness
    {
        private readonly ExpenseApiContext _context;
        private readonly IConfiguration _configuration;

        public ExpenseBusiness(ExpenseApiContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }
        
        public async Task<ActionResult<IEnumerable<ExpenseRecord>>> GetAllExpenseRecord()
        {            
            return await _context.ExpenseRecord.ToListAsync();
        }

        public async Task<ActionResult<bool>> CreateExpenseRecord(ExpenseRecord expenseRecord)
        {
            _context.ExpenseRecord.Add(expenseRecord);
            await _context.SaveChangesAsync();

            using var client = new DaprClientBuilder().Build();
            
            await client.PublishEventAsync("servicebus-pubsub", "expensetopic", expenseRecord);

            return true;
        }

    }
}
