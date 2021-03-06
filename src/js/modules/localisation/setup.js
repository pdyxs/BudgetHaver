import LocalizedStrings from 'react-localization';
import BasicStrings from './basics';

export default new LocalizedStrings({
  en: {
    Welcome_Title: BasicStrings.formatString("Welcome to {0}", BasicStrings.AppTitle),
    Welcome_Texts: [
      "Answer three questions, and you'll be the proud owner of a brand new budget!"
    ],
    Welcome_Next: "OK...",

    Currency_Title: "1. What currency to you live with?",
    Currency_Texts: [
      "This is whatever currency your bank accounts are in. If there's more than one, pick the one you want to think in."
    ],
    Currency_Next: BasicStrings.Next,

    Budget_Title: "2. How much do you spend each day?",
    Budget_Texts: [
      "Budget Haver gives you a daily budget: a certain amount each day to spend.",
      "How much do you <i>think</i> you spend in a day? These are your everyday expenses like your morning coffee, lunch, the movies. Not your rent or netflix subscription",
      "Don't worry too much about this number being right, you can always change it later if you're not happy with it"
    ],
    Budget_Next: BasicStrings.Next,

    StartingBalance_Title: "3. What's your starting balance?",
    StartingBalance_Texts: [
      "Instead of looking at lots of different bank accounts, when you use Budget Haver you look at one number: your balance.",
      "This balance goes up by your daily budget at midnight each day",
      "I recommend you start with 4-6 day's worth, as a buffer while you get used to the app"
    ],
    StartingBalance_Next: BasicStrings.Next,

    Congratulations_Title: "Congratulations",
    Congratulations_Title_2: "You are now a Budget Haver!",
    Congratulations_Budget_Header: "Your Balance:",
    Congratulations_Next: "Great!",

    Rules_Budget_Header: "You have",
    Rules_Header: "There are only 3 rules for your budget:",
    Rules_List: [
      "Treat this number as the amount of money you actually have.",
      "Whenever you spend money that's not recurring, log it in this app",
      "Be kind to yourself. Change your daily budget when it makes sense to do so"
    ],
    Rules_Next: "Let's Start!"
  }
});
