using System.ComponentModel.DataAnnotations;

namespace ScoreIT.RequestModels
{
    public class CreateGameRequestModel
    {
        [Required]
        public int? Player1Id { get; set; }

        [Required]
        public int? Player2Id { get; set; }

        [Required]
        public int? Player3Id { get; set; }

        [Required]
        public int? Player4Id { get; set; }

        [Required]
        [Range(1, 11)]
        public int? GoalLimit { get; set; }
    }
}
