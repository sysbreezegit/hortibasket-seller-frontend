import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, MapPin, Package, CreditCard } from "lucide-react";

interface MobileOrderDetailsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  order: any;
}

export function MobileOrderDetailsDrawer({ isOpen, onClose, order }: MobileOrderDetailsDrawerProps) {
  // If order is null/undefined, don't render anything (or render null).
  // The Dialog component controls visibility via 'open' prop, 
  // so we can render the Dialog even if order is null (it just won't show contents or will be closed).
  // However, to avoid accessing properties of null, we return null if no order.
  if (!order) return null;

  const product = order.items?.[0]?.product || order.product;
  const quantity = order.items?.[0]?.quantity || order.quantity || 1;
  const productPrice = product?.sellingPrice || 0;
  const orderTotal = order.totalAmount || (productPrice * quantity);
  
  const referredAmount = order.referredAmount || 0;
  const refundAmount = order.refundAmount || 0;
  const isReturn = !!order.returnId;

  const getStatusColor = (status: string) => {
    const map: Record<string, string> = {
      pending: "bg-blue-50 text-blue-700 border-blue-200",
      processing: "bg-blue-50 text-blue-700 border-blue-200",
      shipped: "bg-purple-50 text-purple-700 border-purple-200",
      delivered: "bg-green-50 text-green-700 border-green-200",
      cancelled: "bg-red-50 text-red-700 border-red-200",
      returned: "bg-orange-50 text-orange-700 border-orange-200",
      refunded: "bg-gray-50 text-gray-700 border-gray-200",
    };
    return map[status?.toLowerCase()] || "bg-gray-50 text-gray-700 border-gray-200";
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md w-[90%] rounded-2xl p-0 gap-0 overflow-hidden border-0 shadow-xl bg-[#F2F0EA]">
        <DialogHeader className="px-5 py-4 border-b border-gray-100 bg-[#F2F0EA] sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-base font-bold text-gray-900">
               Order Details
            </DialogTitle>
             <Badge className={`${getStatusColor(order.orderStatus || order.status)} border px-2 py-0.5 text-[10px] uppercase font-bold shadow-none rounded-md`}>
                {order.orderStatus || order.status}
              </Badge>
          </div>
        </DialogHeader>

        <div className="p-5 overflow-y-auto max-h-[70vh] space-y-5">
           {/* Product Compact Card */}
           <div className="flex gap-4">
              <div className="h-16 w-16 relative rounded-lg border border-gray-100 bg-gray-50 shrink-0 overflow-hidden">
                {product?.productImages?.[0] ? (
                  <Image
                    src={product.productImages[0]}
                    alt={product.productName || "Product"}
                    fill
                    className="object-cover"
                  />
                ) : (
                   <div className="w-full h-full flex items-center justify-center">
                      <ShoppingBag className="h-6 w-6 text-gray-300" />
                   </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-gray-900 text-sm line-clamp-2 leading-snug">
                    {product?.productName}
                  </h4>
                  <div className="flex items-center gap-2 mt-1.5">
                     <span className="text-sm font-bold text-gray-900">
                       ₹{orderTotal.toLocaleString()}
                     </span>
                     <span className="text-xs text-gray-500 font-medium">
                       ({quantity} item{quantity !== 1 ? 's' : ''})
                     </span>
                  </div>
              </div>
           </div>

           {/* Metrics Grid */}
           <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-gray-50/80 rounded-xl border border-gray-100/50">
                 <div className="flex items-center gap-1.5 text-gray-500 mb-1">
                    <Package className="h-3.5 w-3.5" />
                    <span className="text-[10px] font-bold uppercase tracking-wide">Order ID</span>
                 </div>
                 <p className="font-mono text-xs font-bold text-gray-900 truncate">{order.orderId}</p>
              </div>

              <div className="p-3 bg-gray-50/80 rounded-xl border border-gray-100/50">
                 <div className="flex items-center gap-1.5 text-gray-500 mb-1">
                    <CreditCard className="h-3.5 w-3.5" />
                    <span className="text-[10px] font-bold uppercase tracking-wide">Date</span>
                 </div>
                 <p className="text-xs font-bold text-gray-900">
                    {order.createdAt ? format(new Date(order.createdAt), "dd MMM yyyy") : "N/A"}
                 </p>
              </div>
           </div>

           {/* Commission or Return Info */}
           {(order.commission !== undefined || isReturn) && (
              <div className={`p-4 rounded-xl border ${isReturn ? 'bg-red-50/50 border-red-100' : 'bg-green-50/50 border-green-100'}`}>
                <div className="flex justify-between items-center">
                  <span className={`text-xs font-bold uppercase tracking-wide ${isReturn ? 'text-red-700' : 'text-green-700'}`}>
                    {isReturn ? 'Return Value' : 'Your Commission'}
                  </span>
                  <span className={`text-lg font-black ${isReturn ? 'text-red-600' : 'text-green-600'}`}>
                    {isReturn ? '-' : '+'}₹{(isReturn ? refundAmount : referredAmount).toLocaleString()}
                  </span>
                </div>
              </div>
           )}

           {/* Shipping Address */}
           {order.shippingAddress && (
              <div className="space-y-3 pt-2">
                 <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5" />
                    Shipping Address
                 </h4>
                 <div className="p-3 rounded-xl border border-gray-100 text-sm">
                    <p className="font-bold text-gray-900 mb-0.5">{order.shippingAddress.fullName}</p>
                    <p className="text-gray-500 text-xs leading-relaxed">
                       {order.shippingAddress.addressLine1}, {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
                    </p>
                    <p className="text-gray-500 text-xs mt-1 font-medium">
                       Ph: {order.shippingAddress.mobileNumber}
                    </p>
                 </div>
              </div>
           )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
