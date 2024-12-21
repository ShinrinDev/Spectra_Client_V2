import React, { useState } from 'react';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import logo from "../../images/logo/newlogo.jpg"; // Add your logo image here

const packageData = [
  {
    name: 'Sachino AI',
    price: 100.0,
    invoiceDate: 'Jan 13, 2023',
    status: 'Paid',
    invoiceId: 'INV-001',
  },
  {
    name: 'Raju for Sales',
    price: 59.0,
    invoiceDate: 'Nov 29, 2024',
    status: 'Paid',
    invoiceId: 'INV-002',
  },
  {
    name: 'Gad Markets',
    price: 99.0,
    invoiceDate: 'Nov 29, 2024',
    status: 'Unpaid',
    invoiceId: 'INV-003',
  },
  {
    name: 'Lalloo Leads',
    price: 59.0,
    invoiceDate: 'Nov 29, 2024',
    status: 'Unpaid',
    invoiceId: 'INV-004',
  },
];

// Calculate weekly total of unpaid invoices
const unpaidInvoices = packageData.filter(invoice => invoice.status === 'Unpaid');
const totalUnpaid = unpaidInvoices.reduce((total, invoice) => total + invoice.price, 0);

// Modal Component
const Modal = ({ invoice, onClose }: { invoice: any; onClose: () => void }) => {
  if (!invoice) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-5 w-96 relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          ✖
        </button>
        <div className="text-center">
          <h2 className="text-lg font-semibold mb-4">{invoice.name}</h2>
          <p className="mb-2">
            <strong>Invoice ID:</strong> {invoice.invoiceId}
          </p>
          <p className="mb-2">
            <strong>Amount:</strong> ${invoice.price}
          </p>
          <p className="mb-2">
            <strong>Date:</strong> {invoice.invoiceDate}
          </p>
          <p className="mb-2">
            <strong>Status:</strong>{' '}
            <span
              className={`${
                invoice.status === 'Paid' ? 'text-green-500' : 'text-red-500'
              }`}
            >
              {invoice.status}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

// Main Component
const TableThree = () => {
  const [selectedInvoice, setSelectedInvoice] = useState<any | null>(null);

  // Function to handle "View Invoice"
  const handleViewInvoice = (invoice: any) => {
    setSelectedInvoice(invoice);
  };

  // Function to close modal
  const handleCloseModal = () => {
    setSelectedInvoice(null);
  };

  // Function to handle "Download Invoice as .txt"
  const handleDownloadAsText = (invoice: any) => {
    const invoiceContent = `
      Invoice ID: ${invoice.invoiceId}
      Name: ${invoice.name}
      Amount: $${invoice.price}
      Date: ${invoice.invoiceDate}
      Status: ${invoice.status}
      --- Logo Link: https://example.com/logo ---
    `;
    const blob = new Blob([invoiceContent], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, `${invoice.invoiceId}.txt`);
  };

  // Function to handle "Download Invoice as .pdf"
  const handleDownloadAsPDF = (invoice: any) => {
    const pdf = new jsPDF();

    // Set up font and style
    pdf.setFont("times", "normal");
    pdf.setFontSize(12);

    // Add logo to the PDF
    const logoWidth = 10;
    const logoHeight = 10;
    pdf.addImage(logo, 'PNG', 10, 10, logoWidth, logoHeight);

    // Company name text
    pdf.setFontSize(16);
    pdf.text("Spectra Acquisition", 25, 18);

    // Title: Invoice
    pdf.setFontSize(18);
    pdf.text("Invoice", 10, 35);

    // Invoice ID and Date on the same line (ID at the far right)
    pdf.setFontSize(12);
    pdf.text(`Invoice Date: ${invoice.invoiceDate}`, 10, 55);
    pdf.text(`Invoice ID: ${invoice.invoiceId}`, 180, 55, { align: "right" });

    // Gray background for amounts and description
    pdf.setFillColor(220, 220, 220); // light gray
    pdf.rect(10, 65, 190, 30, 'F'); // Draw a gray background for the section
    pdf.setTextColor(0, 0, 0); // Reset text color to black

    // Description inside the gray area
    pdf.text(`Description: ${invoice.name}`, 12, 70);
    pdf.text(`Amount: $${invoice.price}`, 12, 80);
    pdf.text(`Status: ${invoice.status}`, 12, 90)


    // Add a divider line
    pdf.setLineWidth(0.5);
    pdf.line(10, 95, 200, 95);

    // Footer with company info
    pdf.setFontSize(10);
    pdf.text("Spectra Acquisition", 10, 280);
    pdf.text("www.spectra-acquisition.com", 10, 290);

    // Save the PDF
    pdf.save(`${invoice.invoiceId}.pdf`);
  };

  // Function to handle "Download Weekly Summary as .pdf"
  const handleDownloadWeeklyAsPDF = () => {
    const pdf = new jsPDF();

    // Set up font and style
    pdf.setFont("times", "normal");
    pdf.setFontSize(12);

    // Add logo to the PDF
    const logoWidth = 10;
    const logoHeight = 10;
    pdf.addImage(logo, 'PNG', 10, 10, logoWidth, logoHeight);

    // Company name text
    pdf.setFontSize(16);
    pdf.text("Spectra Acquisition", 22, 18);

    // Title for Weekly Summary
    pdf.setFontSize(18);
    pdf.text("Weekly Invoice", 10, 35);

    // Add the date of the weekly invoice
    const currentDate = new Date().toLocaleDateString();
    pdf.setFontSize(12);
    // Position the date to the far right of the page
    pdf.text(`Date: ${currentDate}`, 190, 45, { align: "right" });

    // Add list of unpaid invoices with dates
    let y = 55;
    pdf.setFontSize(12);
    unpaidInvoices.forEach((invoice) => {
      // Adding the invoice list with gray background for the amounts
      pdf.setFillColor(220, 220, 220); // light gray
      pdf.rect(10, y, 190, 10, 'F'); // Draw a gray background for the section
      pdf.setTextColor(0, 0, 0); // Reset text color to black

      // Show name, price, invoice ID, and align date to the right
      pdf.text(
        `- ${invoice.name} - $${invoice.price} (Invoice ID: ${invoice.invoiceId})`,
        10,
        y + 6
      );
      pdf.text(`Date: ${invoice.invoiceDate}`, 190, y + 6, { align: "right" });

      y += 20;
    });

    // Add total unpaid amount
    pdf.setFillColor(220, 220, 220); // light gray
    pdf.setFontSize(14);
    pdf.text(`\nTotal Unpaid Amount: $${totalUnpaid.toFixed(2)}`, 10, y + 6);

    // Add a divider line
    pdf.setLineWidth(0.5);
    pdf.line(10, y + 15, 200, y + 15);

    // Footer with company info
    pdf.setFontSize(10);
    pdf.text("Spectra Acquisition", 10, y + 30);
    pdf.text("www.spectra-acquisition.com", 10, y + 40);

    // Save the PDF
    pdf.save('Weekly_Invoice.pdf');
};



  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">Invoices</h4>

      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                Lead
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Invoice Date
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Status
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {packageData.map((packageItem, key) => (
              <tr key={key}>
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {packageItem.name}
                  </h5>
                  <p className="text-sm">${packageItem.price}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {packageItem.invoiceDate}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p
                    className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                      packageItem.status === 'Paid'
                        ? 'bg-success text-success'
                        : 'bg-danger text-danger'
                    }`}
                  >
                    {packageItem.status}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    <button
                      className="text-sm bg-blue-500 text-white px-4 py-2 rounded"
                      onClick={() => handleViewInvoice(packageItem)}
                    >
                      View
                    </button>
                    <button
                      className="text-sm bg-green-500 text-white px-4 py-2 rounded"
                      onClick={() => handleDownloadAsPDF(packageItem)}
                    >
                      Download PDF
                    </button>
                    <button
                      className="text-sm bg-purple-500 text-white px-4 py-2 rounded"
                      onClick={() => handleDownloadAsText(packageItem)}
                    >
                      Download Text
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {/* Weekly Invoice Summary Row */}
            <tr>
              <td colSpan={4} className="text-center py-4 font-semibold">
                Weekly Invoice Summary
                <div className="mt-2">
                  <p className="font-medium">Total Unpaid: ${totalUnpaid.toFixed(2)}</p>
                  <div className="mt-4">
                    <h5 className="font-medium text-left">Unpaid Invoices:</h5>
                    <ul className="text-left">
                      {unpaidInvoices.map((invoice) => (
                        <li key={invoice.invoiceId}>
                          {invoice.name} - ${invoice.price} (ID: {invoice.invoiceId})
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button
                    className="bg-primary text-white px-6 py-3 rounded mt-4"
                    onClick={handleDownloadWeeklyAsPDF}
                  >
                    Download Weekly Summary PDF
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Modal for invoice details */}
      <Modal invoice={selectedInvoice} onClose={handleCloseModal} />
    </div>
  );
};

export default TableThree;
