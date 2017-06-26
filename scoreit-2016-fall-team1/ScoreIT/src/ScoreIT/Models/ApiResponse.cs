using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ScoreIT.Models
{
    public class ApiResponse
    {
        public bool IsSuccess { get; set; }
        public object Data { get; set; }
        public string[] Messages { get; set; }

        public ApiResponse(bool isSuccess, object data = default(object), string[] messages = default(string[]))
        {
            IsSuccess = isSuccess;
            Data = data;
            Messages = messages;
        }
        public ApiResponse()
        {

        }

        public ApiResponse(bool isSuccess, string[] messages)
        {
            IsSuccess = isSuccess;
            Messages = messages;
        }
    }
}
