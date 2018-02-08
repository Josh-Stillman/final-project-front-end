import * as helpers from './Helpers'
export const myStates = {
 bizRep: {
   tooltip: (d) => `${d.name}\n${helpers.pctFormatter(d.total_rep_pct)} to Rs\n${helpers.intFormatter.format(d.total_rep)} to Rs`,
   x: "total_rep",
   y: "total_rep_pct",
   x_label: "Amount to Republicans (2016-2018)",
   y_label: "% to Republicans",
   title: "Donations to Republicans",
   buttonText: "Show Democrats",
   legendTitle: "Size = Your Spending",
   bizButtonActive: true,
   bubbleSize: "user_total_spending",
   xAxisDomain: [-1, 10],
   xAxisTickFormat: (x) => (`$${x / 1000000}m`)
 },
 bizDem: {
   tooltip: (d) => `${d.name}\n${helpers.pctFormatter(d.total_dem_pct)} to Ds\n${helpers.intFormatter.format(d.total_dem)} to Ds`,
   x: "total_dem",
   y: "total_dem_pct",
   x_label: "Amount to Democrats (2016-2018)",
   y_label: "% to Democrats",
   title: "Donations to Democrats",
   buttonText: "Show Republicans",
   legendTitle: "Size = Your Spending",
   bizButtonActive: true,
   bubbleSize: "user_total_spending",
   xAxisDomain: [-1, 10],
   xAxisTickFormat: (x) => (`$${x / 1000000}m`)
 },
 userRep: {
   tooltip: (d) => `${d.name}\n${helpers.pctFormatter(d.total_rep_pct)} to Rs\n${helpers.intFormatter.format(d.total_rep)} to Rs`,
   x: "user_total_spending",
   y: "total_rep_pct",
   x_label: "Your Spending at the Business",
   y_label: "% to Republicans",
   title: "Your Spending v. R Amount",
   buttonText: "Show Democrats",
   legendTitle: "Size = Amount to Republicans (2016-18)",
   bizButtonActive: false,
   bubbleSize: "total_rep",
   xAxisDomain: [-1, 10],
   xAxisTickFormat: (x) => (`$${x / 1000}k`)
 },
 userDem: {
   tooltip: (d) => `${d.name}\n${helpers.pctFormatter(d.total_dem_pct)} to Ds\n${helpers.intFormatter.format(d.total_dem)} to Ds`,
   x: "user_total_spending",
   y: "total_dem_pct",
   x_label: "Your Spending at the Business",
   y_label: "% to Democrats",
   title: "Your Spending v. D Amount",
   buttonText: "Show Republicans",
   legendTitle: "Size = Amount to Democrats (2016-18)",
   bizButtonActive: false,
   bubbleSize: "total_dem",
   xAxisDomain: [-1, 10],
   xAxisTickFormat: (x) => (`$${x / 1000}k`)
 }

}
