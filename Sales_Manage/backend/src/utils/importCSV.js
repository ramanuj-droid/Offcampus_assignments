import fs from "fs";
import csv from "csv-parser";
import Sale from "../models/Sale.js";

export const importCSV = async () => {
  const isImported = await Sale.countDocuments();

  if (isImported > 0) {
    console.log("CSV already imported.");
    return;
  }

  console.log("Importing CSV...");

  return new Promise((resolve, reject) => {
    const results = [];

    fs.createReadStream("data/truestate_assignment_dataset.csv")
      .pipe(csv())
      .on("data", (data) => {
        results.push({
          TransactionID: data["Transaction ID"],
          Date: data["Date"],
          CustomerID: data["Customer ID"],
          CustomerName: data["Customer Name"],
          PhoneNumber: data["Phone Number"],
          Gender: data["Gender"],
          Age: Number(data["Age"]),
          CustomerRegion: data["Customer Region"],
          CustomerType: data["Customer Type"],
          ProductID: data["Product ID"],
          ProductName: data["Product Name"],
          Brand: data["Brand"],
          ProductCategory: data["Product Category"],
          Tags: data["Tags"],
          Quantity: Number(data["Quantity"]),
          PricePerUnit: Number(data["Price per Unit"]),
          DiscountPercentage: Number(data["Discount Percentage"]),
          TotalAmount: Number(data["Total Amount"]),
          FinalAmount: Number(data["Final Amount"]),
          PaymentMethod: data["Payment Method"],
          OrderStatus: data["Order Status"],
          DeliveryType: data["Delivery Type"],
          StoreID: data["Store ID"],
          StoreLocation: data["Store Location"],
          SalespersonID: data["Salesperson ID"],
          EmployeeName: data["Employee Name"],
        });

        if (results.length === 10000) {
          Sale.insertMany(results);
          results.length = 0;
        }
      })
      .on("end", async () => {
        if (results.length > 0) await Sale.insertMany(results);
        console.log("CSV Imported Successfully.");
        resolve();
      })
      .on("error", reject);
  });
};
