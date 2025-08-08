import { respData, respErr } from "@/lib/resp";
import { cookies } from "next/headers";
import { sign } from "jsonwebtoken";

// 仅在开发环境可用的测试登录 API
export async function POST(req: Request) {
  // 仅在开发环境允许
  if (process.env.NODE_ENV !== "development") {
    return respErr("Not available in production", 403);
  }

  try {
    // 创建一个模拟用户会话
    const mockUser = {
      uuid: "test-user-123",
      email: "test@example.com",
      name: "Test User",
      avatar: null,
      credits: 1000,
      created_at: new Date().toISOString(),
    };

    // 创建 JWT token
    const token = sign(
      {
        user: mockUser,
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // 24 hours
      },
      process.env.AUTH_SECRET || "test-secret"
    );

    // 设置 cookie
    const cookieStore = await cookies();
    cookieStore.set("test-auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 24 hours
      path: "/",
    });

    return respData({
      user: mockUser,
      message: "Test login successful",
    });
  } catch (error: any) {
    console.error("Dev login error:", error);
    return respErr("Login failed: " + error.message);
  }
}