import React, { useState } from 'react';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import logo from "../../images/logo/SpectraBlackTrans.png";
 // Add your logo image here

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
 

  // Function to handle "Download Invoice as .pdf"
  const handleDownloadAsPDF = (invoice: any) => {
    const pdf = new jsPDF();

    // Set up font and style
    pdf.setFont("times", "normal");
    pdf.setFontSize(12);

    // Add logo to the PDF
    const logoWidth = 25;
    const logoHeight = 10;
    pdf.addImage(logo, 'PNG', 5, 5, logoWidth, logoHeight);

    // Company name text
    pdf.setFontSize(16);
    pdf.text("Spectra Acquisition", 35, 10);

   
  

    // Invoice ID and Date on the same line (ID at the far right)
    pdf.setFontSize(12);
    pdf.text(`Invoice: ${invoice.invoiceId}`, 150, 20);
    pdf.text(`Issued on: ${invoice.invoiceDate}`, 150, 28);
    pdf.text(`Due by: ${invoice.invoiceDate}`, 150, 36);

    pdf.setFont("helvetica", "bold");
    pdf.text("From:", 10,50);
    pdf.setFontSize(12);
    pdf.setFont("helvetic","normal");
    pdf.text("Spectra Acquisition", 10, 58);
    pdf.text("zane@spectraacquisition.com", 10, 66);
    pdf.text("+447418355227",10,74);
    pdf.text("spectraacquisition.com",10, 82);

     // Recipient Details
     pdf.setFontSize(12);
     pdf.setFont("helvetica", "bold");
     pdf.text("To:", 120, 50);
     pdf.setFont("helvetica", "normal");
     pdf.text("Shinrin AI Solutions", 120, 58);
     pdf.text("Thavir Raju", 120,66)
     pdf.text("thavir@shinrin.com", 120, 74);
     pdf.text("+1 2540 56810", 120, 82);
     pdf.text("6969 Shinrin Cave, My Basement, Moms Place", 120, 90);

     //Remarks

     pdf.setFont("helvetic", "bold");
     pdf.text("Remarks",10,100);
     pdf.setFont("helvetica", "normal");
     pdf.text("Bank name:",10,108);
     pdf.text("Barclays",10,116);
     pdf.text("Sort code:",10,126);
     pdf.text("231486",10,134);
     pdf.text("Account number:",10,142);
     pdf.text("15167151",10,150);
     pdf.text("Beneficiary name:",10,158);
     pdf.text("Zane Czepek",10,166);
     pdf.text("067 718 3670",10,176);

    // Gray background for amounts and description
    pdf.setFillColor(220, 220, 220); // light gray
    pdf.rect(9, 190, 190, 6, 'F'); // Draw a gray background for the section
    pdf.setTextColor(0, 0, 0); // Reset text color to black

    // Description inside the gray area
    pdf.setFontSize(10);
    pdf.setFont("helvetica", "bold");
    pdf.text("Product", 10, 195);
    pdf.text("Quantity", 70, 195);
    pdf.text("Unit Price", 100, 195);
    pdf.text("Tax", 130, 195);
    pdf.text("Total", 160, 195);

    pdf.setFont("helvetica", "normal");
    pdf.text(`${invoice.name}`,10,200);
    pdf.text("1",70,200);
    pdf.text(`£ ${invoice.price}`,100,200);
    pdf.text("£ 0",130,200)
    pdf.text(`£ ${invoice.price}`,160,200)

    pdf.setDrawColor(150);
    pdf.setLineWidth(0.5);
    pdf.line(10, 205, 200, 205);

    let y = 210;

    y += 10;
    pdf.setFont("helvetica", "bold");
    pdf.text("Invoice Summary", 10, y);
    y += 10;
    pdf.setFont("helvetica", "normal");
    pdf.text(`Subtotal: £ ${invoice.price.toFixed(2)}`, 10, y);
    pdf.text(`Tax: £ 0`, 10, y + 10);
    pdf.text(`Total: £ ${invoice.price.toFixed(2)}`, 10, y + 20);


    // Add a divider line
    

    // Footer with company info
    pdf.setFont("helvetica", "italic");
    pdf.setFontSize(10);
    pdf.text("Thank you for choosing Spectra Acquisition!", 105, 280, { align: "center" });

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
    const logoWidth = 25;
    const logoHeight = 10;
    pdf.addImage(logo, 'PNG', 5, 5, logoWidth, logoHeight);

    // Company name text
    pdf.setFontSize(16);
    pdf.text("Spectra Acquisition", 35, 10);

    const currentDate = new Date().toLocaleDateString();
    pdf.setFontSize(12);
    pdf.text(`Invoice: week_50_0001`, 150, 20);
    pdf.text(`Issued on: ${currentDate}`, 150, 28,{align:"right"});
    pdf.text(`Due by: ${currentDate}`, 150, 36);
    // Add the date of the weekly invoice
    pdf.setFont("helvetica", "bold");
    pdf.text("From:", 10,50);
    pdf.setFontSize(12);
    pdf.setFont("helvetic","normal");
    pdf.text("Spectra Acquisition", 10, 58);
    pdf.text("zane@spectraacquisition.com", 10, 66);
    pdf.text("+447418355227",10,74);
    pdf.text("spectraacquisition.com",10, 82);

     // Recipient Details
     pdf.setFontSize(12);
     pdf.setFont("helvetica", "bold");
     pdf.text("To:", 120, 50);
     pdf.setFont("helvetica", "normal");
     pdf.text("Shinrin AI Solutions", 120, 58);
     pdf.text("Thavir Raju", 120,66)
     pdf.text("thavir@shinrin.com", 120, 74);
     pdf.text("+1 2540 56810", 120, 82);
     pdf.text("6969 Shinrin Cave, My Basement, Moms Place", 120, 90);

     //Remarks

     pdf.setFont("helvetic", "bold");
     pdf.text("Remarks",10,100);
     pdf.setFont("helvetica", "normal");
     pdf.text("Bank name:",10,108);
     pdf.text("Barclays",10,116);
     pdf.text("Sort code:",10,126);
     pdf.text("231486",10,134);
     pdf.text("Account number:",10,142);
     pdf.text("15167151",10,150);
     pdf.text("Beneficiary name:",10,158);
     pdf.text("Zane Czepek",10,166);
     pdf.text("067 718 3670",10,176);

    // Gray background for amounts and description
    pdf.setFillColor(220, 220, 220); // light gray
    pdf.rect(9, 190, 190, 6, 'F'); // Draw a gray background for the section
    pdf.setTextColor(0, 0, 0); // Reset text color to black

    // Description inside the gray area
    pdf.setFontSize(10);
    pdf.setFont("helvetica", "bold");
    pdf.text("Product", 10, 195);
    pdf.text("Quantity", 70, 195);
    pdf.text("Unit Price", 100, 195);
    pdf.text("Tax", 130, 195);
    pdf.text("Total", 160, 195);

    pdf.setFont("helvetica", "normal");
    pdf.text("Leads",10,200);
    pdf.text(`${unpaidInvoices.length}`,70,200);
    pdf.text(`£ ${totalUnpaid.toFixed(2)}`,100,200);
    pdf.text("£ 0",130,200)
    pdf.text(`£ ${totalUnpaid.toFixed(2)}`,160,200)
    const invoiceNames = unpaidInvoices.map((invoice) => invoice.name).join(", ");
    console.log("invoces names:", invoiceNames);
    pdf.text(`Names: ${invoiceNames}`,208,10)

    pdf.setDrawColor(150);
    pdf.setLineWidth(0.5);
    pdf.line(10, 215, 200, 215);



   
    
    

//Summary...
let y = 220;

    y += 5;
    pdf.setFont("helvetica", "bold");
    pdf.text("Invoice Summary", 10, y);
    y += 5;
    pdf.setFont("helvetica", "normal");
    pdf.text(`Subtotal: £ ${totalUnpaid.toFixed(2)}`, 10, y);
    pdf.text(`Tax: £ 0`, 10, y + 5);
    pdf.text(`Total: £ ${totalUnpaid.toFixed(2)}`, 10, y + 10);


    // Add a divider line
    

    // Footer with company info
    pdf.setFont("helvetica", "italic");
    pdf.setFontSize(10);
    pdf.text("Thank you for choosing Spectra Acquisition!", 105, 280, { align: "center" });
 

    // Save the PDF
    pdf.save('weekly_50_0004.pdf');
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
