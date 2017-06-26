namespace ScoreIT.RequestModels
{
    public class UpdateScoreRequestModel
    {
        public int GameId { get; set; }
        public string Team { get; set; }
        public int ScoreDelta { get; set; }
    }
}
