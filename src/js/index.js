import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
// import store from "../js/store/index";
import App from "../js/components/App";
import { Router, Route } from 'react-router-dom';
import { createHashHistory } from 'history';
import store from './store';
import localforage from 'localforage';

localforage.setDriver(localforage.LOCALSTORAGE);

const history = createHashHistory();
render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App} />
    </Router>
  </Provider>,
  document.getElementById("app")
);

// const defaultSettings = {
//   money: 200,
//   lastUpdated: moment().valueOf(),
//   budget: 65,
//   currency: 1,
//   currentTab: "#help"
// };

// const title = "Budget Haver";
//
// var currencyFormatter = new Intl.NumberFormat('en-AU', {
//   style: 'currency',
//   currency: 'AUD',
//   minimumFractionDigits: 2
// });
//
// var settings = {};
// var spendHistory = [];

// function update() {
//   localforage.setItem('settings', settings).then(() => {
//     $("#dailyBudget").html(settings.budget);
//     $("#moneyDisplay").html(currencyFormatter.format(settings.money));
//     $("#lastUpdated").html(moment(settings.lastUpdated).format("D MMMM YY"));
//     $("#currencySelector").val(settings.currency);
//     $("#currencyConverter").toggleClass('d-none', settings.currency == 1);
//     $('#balanceOverrideInput').val(settings.money.toFixed(2));
//
//     updateCurrency();
//   });
// }
//
// function updateCurrency() {
//   setTimeout(function () {
//     var val = $("#spendMoneyInput").val();
//     var inAud = val / settings.currency;
//     var percentLeft = settings.money < 0 ? -1 : (settings.money - inAud) / settings.money;
//
//     $("#convertedCurrency").html(currencyFormatter.format(inAud));
//     var spendButton = $("#spendButton");
//     spendButton.attr("disabled", val == 0);
//     spendButton.toggleClass("btn-success", percentLeft > 0.5);
//     spendButton.toggleClass("btn-warning", percentLeft > 0 && percentLeft <= 0.5);
//     spendButton.toggleClass("btn-danger", percentLeft <= 0);
//
//     var spendingBar = $("#spendingBar");
//     spendingBar.attr("style", `width: ${Math.max(0, 100 * percentLeft)}%`);
//     spendingBar.toggleClass("bg-success", percentLeft > 0.5);
//     spendingBar.toggleClass("bg-warning", percentLeft > 0 && percentLeft <= 0.5);
//     spendingBar.toggleClass("bg-danger", percentLeft <= 0);
//
//     $("#spendMoneyInput").toggleClass("text-danger", percentLeft < 0);
//   }, 0.01);
// }

// function addHistory(amount) {
//   spendHistory.push({
//     date: moment().valueOf(),
//     amount: amount
//   });
//   updateHistory();
// }
//
// function updateHistory() {
//   localforage.setItem('history', spendHistory).then(() => {
//     var list = $('#historyList');
//     list.empty();
//     var hist = _.reverse(_.takeRight(spendHistory, 5));
//     for (var i = 0; i != hist.length; ++i) {
//       var h = hist[i];
//       var row = $("<tr/>").appendTo(list);
//       $("<td/>").appendTo(row)
//                 .html(moment(h.date).calendar());
//       $("<td/>").appendTo(row)
//                 .html(currencyFormatter.format(h.amount));
//     }
//   });
// }
//
// function setupHistory(hist) {
//   spendHistory = hist || [];
//   updateHistory();
// }
//
// function setup(set) {
//   var today = moment().startOf("day");
//   var lastUpdated = moment(set.lastUpdated).startOf("day");
//
//   var money = set.money + today.diff(lastUpdated, 'days') * set.budget;
//
//   settings = {
//     money: money,
//     lastUpdated: moment().valueOf(),
//     budget: set.budget,
//     currency: set.currency || 1,
//     currentTab: set.currentTab || defaultSettings.currentTab
//   };
//
//   update();

  // //setup listeners
  // $("#currencySelector").on('change', (evt) => {
  //   settings.currency = evt.target.value;
  //   update();
  // });
  //
  // $("#spendMoneyInput").on('keyup', (evt) => {
  //   updateCurrency();
  // });
  //
  // $("#spendButton").click(() => {
  //   spending = $("#spendMoneyInput").val() / settings.currency;
  //   settings.money -= spending;
  //   $("#spendMoneyInput").val('');
  //   update();
  //   addHistory(spending);
  // });
  //
  // $(`#tabMenu a[href="${settings.currentTab}"]`).tab('show');
  //
  // $('#tabMenu a').on('click', function (e) {
  //   settings.currentTab = $(this).attr('href');
  //   update();
  // });
  //
  // $('#dailyBudgetInput').val(settings.budget);
  //
  // $('#dailyBudgetInput').on('keyup', (evt) => {
  //   setTimeout(function () {
  //     settings.budget = $('#dailyBudgetInput').val();
  //     update();
  //   }, 0.01);
  // });
  //
  // $('#balanceOverrideInput').on('keyup', (evt) => {
  //   setTimeout(function () {
  //     var newVal = Number($('#balanceOverrideInput').val());
  //     if (_.isNumber(newVal)) {
  //       settings.money = newVal;
  //     }
  //     update();
  //   }, 0.01);
  // });
  //
  // $(".title-content").html(title);
  //
  // $(".unlock-edit-button").on('click', (evt) => {
  //   var button = $(evt.currentTarget);
  //   var input = $(button.attr('target'));
  //   var isEditing = !input.attr('readonly');
  //   input.attr('readonly', isEditing);
  //   button.toggleClass('editing', !isEditing);
  // });
// }

// $(document).ready(() => {
//   localforage.getItem('settings').then(settings => {
//     setup(settings || defaultSettings);
//   });
//
//   localforage.getItem('history').then(h => {
//     setupHistory(h);
//   });
// });
