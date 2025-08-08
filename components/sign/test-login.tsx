"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export default function TestLogin() {
  const [loading, setLoading] = useState(false);
  
  const handleTestLogin = async () => {
    setLoading(true);
    try {
      // 使用 credentials provider 进行测试登录
      const result = await signIn("credentials", {
        email: "test@example.com",
        password: "test123",
        redirect: false,
      });
      
      if (result?.error) {
        console.error("Login failed:", result.error);
      } else {
        // 登录成功，刷新页面
        window.location.reload();
      }
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };
  
  // 仅在开发环境显示
  if (process.env.NODE_ENV !== "development") {
    return null;
  }
  
  return (
    <Button
      variant="destructive"
      className="w-full flex items-center gap-2"
      onClick={handleTestLogin}
      disabled={loading}
    >
      {loading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          登录中...
        </>
      ) : (
        "测试登录 (开发环境)"
      )}
    </Button>
  );
}