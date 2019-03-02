import LocalizedStrings from 'react-localization';
import BasicStrings from './basics';

export default new LocalizedStrings({
  en: {
    AchievementCongrats: "Congratulations! You've gained the ",
    achievement: "achievement",
    AchievementButton: BasicStrings.Great,

    FirstStarHeading: "You just got your first star!",
    FirstStarTexts: [
      "You get a star for each achievement you finish, and for supporting the app (both with and without money)*.",
      "Once a certain number of stars are gained globally, I'll add another feature to the app*. You can spend Stars to vote on what that feature is*.",
      "*none of this works yet. Plan is for it to be in the release version"
    ],
    FirstStarButton: "Show me my star!",

    GoneNegativeHeading: "Don't Panic",
    GoneNegativeTexts: [
      "You're balance has gone negative for the first time. This happens sometimes!",
      "Sometimes you might stay in the negative for a few days, or even a week or two. That's fine too!",
      "Just make sure you work towards being positive. If you're still in the negative after a while, think about increasing your daily budget (assuming that you can afford to)."
    ],
    GoneNegativeButton: "Let's do this!",
  }
});
