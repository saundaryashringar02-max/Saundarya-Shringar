import React from 'react';

// Convert number to words for the invoice footer
const numberToWords = (num) => {
  const a = ['', 'One ', 'Two ', 'Three ', 'Four ', 'Five ', 'Six ', 'Seven ', 'Eight ', 'Nine ', 'Ten ', 'Eleven ', 'Twelve ', 'Thirteen ', 'Fourteen ', 'Fifteen ', 'Sixteen ', 'Seventeen ', 'Eighteen ', 'Nineteen '];
  const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

  if ((num = num.toString()).length > 9) return 'overflow';
  let n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
  if (!n) return; let str = '';
  str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'Crore ' : '';
  str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'Lakh ' : '';
  str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'Thousand ' : '';
  str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'Hundred ' : '';
  str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + 'Rupees' : 'Rupees';
  return str;
};

const InvoiceTemplate = ({ order }) => {
  if (!order) return null;

  const orderDate = new Date(order.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
  const invoiceNo = order.orderId ? order.orderId.replace(/[^0-9]/g, '').slice(-3) : order._id.slice(-3);
  const totalAmount = order.totalAmount || 0;
  
  // Example reverse calculation from screenshot: Total = 200, Taxable = 169.49, IGST = 30.51
  const taxableAmount = (totalAmount / 1.18).toFixed(2);
  const igstAmount = (totalAmount - taxableAmount).toFixed(2);

  const customerName = (order.user?.name || order.shippingAddress?.name || 'Customer').toUpperCase();
  const addressLine1 = order.shippingAddress?.address ? order.shippingAddress.address.toUpperCase() : '';
  const addressLine2 = `${(order.shippingAddress?.city || '').toUpperCase()}, ${(order.shippingAddress?.state || '').toUpperCase()}, ${order.shippingAddress?.pincode || ''}`;
  const phone = order.user?.phone || order.shippingAddress?.phone || '';
  const state = order.shippingAddress?.state || 'Delhi';

  return (
    <div id="actual-pdf-invoice" className="w-[800px] h-[1131px] bg-white text-gray-800 p-6 font-sans relative overflow-hidden">
      {/* Outer Border */}
      <div className="absolute inset-4 border border-[#C5A551]">
        {/* Inner Border */}
        <div className="absolute inset-1 border border-[#C5A551]">
          {/* Corner Ornaments */}
          <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-[#C5A551]"></div>
          <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-[#C5A551]"></div>
          <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-[#C5A551]"></div>
          <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-[#C5A551]"></div>
          <div className="absolute top-1 left-1 text-[#C5A551]">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L9 9H2l5 5-2 7 7-4 7 4-2-7 5-5h-7z"/></svg>
          </div>
          <div className="absolute top-1 right-1 text-[#C5A551]">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L9 9H2l5 5-2 7 7-4 7 4-2-7 5-5h-7z"/></svg>
          </div>
          <div className="absolute bottom-1 left-1 text-[#C5A551]">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L9 9H2l5 5-2 7 7-4 7 4-2-7 5-5h-7z"/></svg>
          </div>
          <div className="absolute bottom-1 right-1 text-[#C5A551]">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L9 9H2l5 5-2 7 7-4 7 4-2-7 5-5h-7z"/></svg>
          </div>

          <div className="px-6 pt-6 pb-2">
            {/* Header Section */}
            <div className="flex justify-between items-start mb-6">
              <div className="flex gap-4">
                {/* Logo */}
                <div className="w-28 h-28 border border-[#e0c48e] rounded-md overflow-hidden flex-shrink-0">
                  <img src="/logo_s.jpg" onError={(e)=>{e.target.src="/logo_invoice.jpg"}} alt="Saundarya Shringar" className="w-full h-full object-cover" />
                </div>
                
                <div className="flex flex-col justify-center pt-2">
                  <h1 className="text-[26px] font-serif font-bold text-[#2b3a6b] leading-none mb-2">Saundarya Shringar Pvt Ltd</h1>
                  <div className="flex items-center gap-4 text-[10px] font-bold text-[#2b3a6b] mb-1">
                    <p>Pan No <span className="font-normal text-gray-500">ABSCS9405R</span></p>
                    <p>GSTIN <span className="font-normal text-gray-500">06ABSCS9405R1ZA</span></p>
                  </div>
                  <div className="flex items-center gap-4 text-[10px] text-gray-500 mb-1">
                    <p className="flex items-center gap-1"><span className="text-[#d4af37]">📞</span> 9896472169</p>
                    <p className="flex items-center gap-1"><span className="text-[#d4af37]">✉️</span> saundaryashringar02@gmail.com</p>
                  </div>
                  <p className="text-[10px] text-gray-500 flex items-center gap-1 mb-1.5"><span className="text-[#d4af37]">📍</span> LAJPAT NAGAR NEAR RADHA, SWAMIBHAWAN, Fatehabad, Haryana, 125050</p>
                  <div className="flex items-center gap-4 text-[10px] text-[#2b3a6b] font-bold">
                    <p>Website: <span className="font-normal text-gray-500">www.saundaryashringar.com</span></p>
                    <p>Phone Number: <span className="font-normal text-gray-500">01667 454631</span></p>
                  </div>
                </div>
              </div>
              
              <div className="text-right flex flex-col items-center pt-2">
                <h2 className="text-[22px] font-bold text-[#2b3a6b] leading-none mb-1">TAX INVOICE</h2>
                <div className="border border-gray-300 px-3 py-0.5 text-[8px] text-gray-400 uppercase tracking-widest rounded-sm">ORIGINAL FOR RECIPIENT</div>
              </div>
            </div>
          </div>

          <div className="border-t border-[#C5A551]"></div>

          {/* Invoice Info */}
          <div className="flex px-6 py-3">
            <div className="w-1/3">
              <p className="text-[11px] font-bold text-[#2b3a6b] mb-1">Invoice No.</p>
              <p className="text-[11px] text-gray-600">{invoiceNo}</p>
            </div>
            <div className="w-1/3">
              <p className="text-[11px] font-bold text-[#2b3a6b] mb-1">Invoice Date</p>
              <p className="text-[11px] text-gray-600">{orderDate}</p>
            </div>
          </div>

          <div className="border-t border-[#C5A551]"></div>

          {/* Address Details */}
          <div className="grid grid-cols-2 px-6 py-4">
            <div className="pr-6">
              <h3 className="text-[13px] font-bold text-[#2b3a6b] mb-2">Bill To</h3>
              <p className="text-[11px] font-bold text-gray-700 mb-1">MS .{customerName}</p>
              <p className="text-[11px] text-gray-600 leading-tight mb-0.5">{addressLine1}</p>
              <p className="text-[11px] text-gray-600 mb-2">{addressLine2}</p>
              <p className="text-[11px] text-[#2b3a6b] font-bold mb-0.5">Mobile <span className="font-normal text-gray-600">{phone}</span></p>
              <p className="text-[11px] text-[#2b3a6b] font-bold">Place of Supply <span className="font-normal text-gray-600">{state}</span></p>
            </div>
            <div className="border-l border-[#C5A551] pl-6">
              <h3 className="text-[13px] font-bold text-[#2b3a6b] mb-2">Ship To</h3>
              <p className="text-[11px] font-bold text-gray-700 mb-1">MS .{customerName}</p>
              <p className="text-[11px] text-gray-600 leading-tight mb-0.5">{addressLine1}</p>
              <p className="text-[11px] text-gray-600 mb-2">{addressLine2}</p>
            </div>
          </div>

          {/* Items Table */}
          <div className="min-h-[250px] flex flex-col border-t border-[#C5A551]">
            <table className="w-full text-left border-collapse text-[11px]">
              <thead>
                <tr className="bg-[#F8F1E5] border-b border-gray-100">
                  <th className="py-2 px-4 font-bold text-[#2b3a6b] w-10">No</th>
                  <th className="py-2 px-2 font-bold text-[#2b3a6b]">Items</th>
                  <th className="py-2 px-2 font-bold text-[#2b3a6b] text-center w-24">HSN No.</th>
                  <th className="py-2 px-2 font-bold text-[#2b3a6b] text-center w-16">Qty.</th>
                  <th className="py-2 px-2 font-bold text-[#2b3a6b] text-center w-20">Rate</th>
                  <th className="py-2 px-2 font-bold text-[#2b3a6b] text-center w-20">Disc.</th>
                  <th className="py-2 px-2 font-bold text-[#2b3a6b] text-center w-20">Tax</th>
                  <th className="py-2 px-4 font-bold text-[#2b3a6b] text-right w-20">Total</th>
                </tr>
              </thead>
              <tbody>
                {order.items?.map((item, index) => {
                  const qty = item.quantity || 1;
                  const totalItemPrice = item.price * qty;
                  const itemTaxableAmount = totalItemPrice / 1.18;
                  const itemTax = totalItemPrice - itemTaxableAmount;
                  const rate = itemTaxableAmount; // assuming no disc
                  
                  return (
                    <tr key={index} className="align-top">
                      <td className="py-3 px-4 text-gray-600">{index + 1}</td>
                      <td className="py-3 px-2 text-gray-700 pr-8 leading-tight">{item.name} {item.size && `(${item.size})`}</td>
                      <td className="py-3 px-2 text-gray-600 text-center">3304</td>
                      <td className="py-3 px-2 text-gray-600 text-center">{qty} PCS</td>
                      <td className="py-3 px-2 text-gray-600 text-center">{rate.toFixed(2)}</td>
                      <td className="py-3 px-2 text-gray-600 text-center text-[10px] leading-tight">
                          <span className="block text-gray-600 text-[11px]">0.00</span>
                          <span className="text-gray-400">(0%)</span>
                      </td>
                      <td className="py-3 px-2 text-gray-600 text-center text-[10px] leading-tight">
                          <span className="block text-gray-600 text-[11px]">{itemTax.toFixed(2)}</span>
                          <span className="text-gray-400">(18%)</span>
                      </td>
                      <td className="py-3 px-4 text-gray-700 text-right">{totalItemPrice.toFixed(0)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Subtotal Footer */}
          <div className="bg-[#F8F1E5] flex py-2 border-y border-[#C5A551]">
              <div className="w-10"></div>
              <div className="font-bold text-[#2b3a6b] flex-1 text-[11px] px-2">SUBTOTAL</div>
              <div className="w-24"></div>
              <div className="w-16 text-center text-[11px] font-bold text-[#2b3a6b]">
                  {(order.items || []).reduce((acc, item) => acc + item.quantity, 0)}
              </div>
              <div className="w-20"></div>
              <div className="w-20 text-center text-[11px] font-bold text-[#2b3a6b]">₹ 0.00</div>
              <div className="w-20 text-center text-[11px] font-bold text-[#2b3a6b]">₹ {igstAmount}</div>
              <div className="w-20 px-4 text-right text-[11px] font-bold text-[#2b3a6b]">₹ {totalAmount.toFixed(0)}</div>
          </div>

          {/* Footer Details */}
          <div className="grid grid-cols-2">
            {/* Left Col: T&C and Bank Details */}
            <div className="p-6">
              <div className="mb-6">
                  <h4 className="text-[11px] font-bold text-[#2b3a6b] mb-1">Terms & Conditions</h4>
                  <div className="text-[9px] text-gray-500 space-y-0.5 leading-tight pr-4">
                      <p>1. For Online Orders: Dispatch upto 15 working days; Delivery time after dispatch: Metro 3-5 days, Non-metro 7-10 days (delays possible).</p>
                      <p>2. Returns only for online orders within 2 days (with approval).</p>
                      <p>3. Cancellation allowed only before dispatch (online orders).</p>
                      <p>4. These products do not cover any Warranty; seller not liable for any damages.</p>
                      <p>5. Goods remain seller's property until full payment.</p>
                      <p>6. All disputes are subject to Fatehabad, Haryana jurisdiction only.</p>
                  </div>
              </div>

              <div>
                  <h4 className="text-[11px] font-bold text-[#2b3a6b] mb-2">Bank Details</h4>
                  <div className="grid grid-cols-[80px_1fr] gap-y-1 text-[10px]">
                      <span className="font-bold text-[#2b3a6b]">Name</span>
                      <span className="text-gray-600 uppercase">SAUNDARYA SHRINGAR PRIVATE LIMITED</span>
                      
                      <span className="font-bold text-[#2b3a6b]">IFSC</span>
                      <span className="text-gray-600 uppercase">CLBL0000191</span>
                      
                      <span className="font-bold text-[#2b3a6b]">Account No</span>
                      <span className="text-gray-600">191105000023</span>
                      
                      <span className="font-bold text-[#2b3a6b]">Bank Name</span>
                      <span className="text-gray-600">Capital Small Finance Bank, FATEHABAD</span>
                  </div>
              </div>
            </div>

            {/* Right Col: Tax Totals and Signature */}
            <div className="p-6 pl-0 flex flex-col">
              <div className="mb-4">
                  <div className="flex justify-between text-[11px] text-gray-600 mb-1">
                      <span>Taxable Amount</span>
                      <span>₹ {taxableAmount}</span>
                  </div>
                  <div className="flex justify-between text-[11px] text-gray-600">
                      <span>IGST @18%</span>
                      <span>₹ {igstAmount}</span>
                  </div>
              </div>

              <div className="border-t border-[#C5A551] mb-4"></div>

              <div className="flex justify-between text-[12px] font-bold text-[#2b3a6b] mb-4">
                  <span>Total Amount</span>
                  <span>₹ {totalAmount.toFixed(0)}</span>
              </div>

              <div className="border-t border-gray-100 mb-4"></div>

              <div className="flex justify-between text-[11px] text-gray-600 mb-1">
                  <span>Received Amount</span>
                  <span>₹ {totalAmount.toFixed(0)}</span>
              </div>
              <div className="flex justify-between text-[11px] font-bold text-[#2b3a6b] mb-6">
                  <span>Balance</span>
                  <span>₹ 0</span>
              </div>

              <div className="mb-6">
                  <p className="text-[11px] font-bold text-[#2b3a6b] mb-1">Total Amount (in words)</p>
                  <p className="text-[11px] text-gray-600 capitalize">{numberToWords(totalAmount)}</p>
              </div>

              <div className="mt-auto border border-[#C5A551] rounded-lg p-3 flex flex-col items-center justify-center text-center relative h-24">
                  {/* Signature graphic placeholder */}
                  <img src="/admin_logo.png" className="h-10 w-auto object-contain opacity-70 absolute" alt="stamp" />
                  <div className="absolute font-signature text-xl text-[#2b3a6b] mt-2 opacity-90" style={{ fontFamily: "'Dancing Script', cursive" }}>
                      Sunil Kumar
                  </div>
                  <p className="text-[11px] font-bold text-[#2b3a6b] mt-10">Signature</p>
                  <p className="text-[9px] text-gray-500">Saundarya Shringar Pvt Ltd</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceTemplate;
