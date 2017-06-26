using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace ScoreIT.Models
{
    public static class ModelStateHandler
    {
        public static string[] GetModelStateErrors(ModelStateDictionary modelState)
        {
            var modelErrors = new List<string>();
            foreach (var modelStateValue in modelState.Values)
            {
                foreach (var error in modelStateValue.Errors)
                {
                    modelErrors.Add(error.ErrorMessage);
                }
            }

            return modelErrors.ToArray();
        }
    }
}
