using System.Collections.Generic;

namespace ScoreIT.Models
{
    public static class Constants
    {
        public static string Team1 = "Team1";
        public static string Team2 = "Team2";

        public static string DefaultAvatar = "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";

        public static int BaseXP = 40;
        public static int Factor = 20;
        public static List<string> Title = new List<string> {
            "Rookie", "Trainee", "Hobbyist", "Amateur", "Hotshot","Captain", "Leader", "Pioneer", "Professional", "Expert",
            "Veteran", "Elite", "Artist", "Super Star", "Virtuoso","Genius", "Prodigy", "Champion", "Guru", "Grand Master",
            "Legend", "Superhuman", "Immortal", "Demi-God"
        };
    }
}
