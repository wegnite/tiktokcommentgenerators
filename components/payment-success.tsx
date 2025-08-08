"use client";

import { useEffect, useState } from "react";
import { CheckCircle, Loader2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

interface PaymentSuccessProps {
  orderNo?: string;
  sessionId?: string;
}

export default function PaymentSuccess({ orderNo, sessionId }: PaymentSuccessProps) {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [orderDetails, setOrderDetails] = useState<any>(null);

  useEffect(() => {
    const checkPaymentStatus = async () => {
      try {
        // Check order status
        const response = await fetch(`/api/check-order-status`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            order_no: orderNo,
            session_id: sessionId,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          if (data.status === 'paid') {
            setStatus('success');
            setOrderDetails(data);
            
            // Show success notification
            showSuccessNotification();
          } else {
            // Retry after 2 seconds if still processing
            setTimeout(() => checkPaymentStatus(), 2000);
          }
        } else {
          setStatus('error');
        }
      } catch (error) {
        console.error('Error checking payment status:', error);
        setStatus('error');
      }
    };

    checkPaymentStatus();
  }, [orderNo, sessionId]);

  const showSuccessNotification = () => {
    // Create a success notification
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 z-50 animate-in slide-in-from-top-2 duration-300';
    notification.innerHTML = `
      <div class="bg-green-50 border border-green-200 text-green-800 px-6 py-4 rounded-lg shadow-lg flex items-center gap-3">
        <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <div>
          <p class="font-semibold">支付成功！</p>
          <p class="text-sm">您的订单已成功支付，感谢您的购买！</p>
        </div>
      </div>
    `;
    document.body.appendChild(notification);

    // Remove notification after 5 seconds
    setTimeout(() => {
      notification.classList.add('animate-out', 'slide-out-to-top-2');
      setTimeout(() => notification.remove(), 300);
    }, 5000);
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4">
              <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
            </div>
            <CardTitle>正在确认支付状态</CardTitle>
            <CardDescription>
              请稍候，我们正在处理您的支付...
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-100">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4">
              <XCircle className="h-12 w-12 text-red-600" />
            </div>
            <CardTitle>支付验证失败</CardTitle>
            <CardDescription>
              无法确认您的支付状态，请联系客服
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Link href="/">
              <Button variant="outline">返回首页</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            <div className="relative">
              <CheckCircle className="h-16 w-16 text-green-600" />
              <div className="absolute -inset-1 bg-green-600 opacity-20 blur-xl rounded-full animate-pulse" />
            </div>
          </div>
          <CardTitle className="text-2xl">支付成功！</CardTitle>
          <CardDescription>
            您的订单已成功支付，感谢您的购买
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {orderDetails && (
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">订单号：</span>
                <span className="font-medium">{orderDetails.order_no}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">金额：</span>
                <span className="font-medium">
                  ${(orderDetails.amount / 100).toFixed(2)} {orderDetails.currency?.toUpperCase()}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">积分：</span>
                <span className="font-medium">{orderDetails.credits} Credits</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">状态：</span>
                <span className="font-medium text-green-600">已支付</span>
              </div>
            </div>
          )}
          
          <div className="flex flex-col gap-2">
            <Link href="/my-orders" className="w-full">
              <Button className="w-full">查看我的订单</Button>
            </Link>
            <Link href="/" className="w-full">
              <Button variant="outline" className="w-full">返回首页</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}