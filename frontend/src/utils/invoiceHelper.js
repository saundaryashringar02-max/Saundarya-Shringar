import html2pdf from 'html2pdf.js';
import React from 'react';
import { createRoot } from 'react-dom/client';
import InvoiceTemplate from '../components/admin/InvoiceTemplate';

export const generateInvoice = async (order) => {
  return new Promise((resolve, reject) => {
    try {
      // 1. Create a wrapper div and append it to the body (hidden)
      const container = document.createElement('div');
      container.style.position = 'absolute';
      container.style.left = '-9999px';
      container.style.top = '-9999px';
      document.body.appendChild(container);

      // 2. Render the React component into it without JSX syntax
      const root = createRoot(container);
      root.render(React.createElement(InvoiceTemplate, { order: order }));

      // 3. Wait a moment for React to mount and images to load
      setTimeout(async () => {
        try {
          const element = container.querySelector('#actual-pdf-invoice') || container.firstChild;
          const opt = {
            margin: 0,
            filename: `invoice_${order.orderId || order._id.slice(-6)}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
          };

          await html2pdf().set(opt).from(element).save();
          
          // Cleanup
          root.unmount();
          document.body.removeChild(container);
          resolve();
        } catch (err) {
          console.error("Invoice generation failed:", err);
          alert("Invoice download failed. Please try again.");
          root.unmount();
          document.body.removeChild(container);
          reject(err);
        }
      }, 500); // 500ms allows images like the logo to load properly
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
};
