import { Router } from "express";
import { db } from "@workspace/db";
import { randomUUID } from "crypto";

const router = Router();

const MOCK_ORDERS_DB: any[] = [
  { id: "ORD-8841", userId: "demo", service: "IG Followers (NG Plus)", platform: "instagram", qty: 5000, status: "Active", progress: 73, chargeNaira: 9600, delivered: 3650, link: "@youraccount", createdAt: new Date(Date.now() - 7200000).toISOString() },
  { id: "ORD-8840", userId: "demo", service: "TK Views (Fast)", platform: "tiktok", qty: 50000, status: "Completed", progress: 100, chargeNaira: 8000, delivered: 50000, link: "tiktok.com/v/123", createdAt: new Date(Date.now() - 18000000).toISOString() },
  { id: "ORD-8839", userId: "demo", service: "YT Subscribers (Fast)", platform: "youtube", qty: 1000, status: "Pending", progress: 0, chargeNaira: 3200, delivered: 0, link: "youtube.com/@channel", createdAt: new Date(Date.now() - 300000).toISOString() },
  { id: "ORD-8838", userId: "demo", service: "Telegram Members (Real)", platform: "telegram", qty: 2000, status: "Completed", progress: 100, chargeNaira: 4400, delivered: 2000, link: "t.me/yourgroup", createdAt: new Date(Date.now() - 86400000).toISOString() },
];

// GET /api/orders — authenticated user's orders
router.get("/orders", (req, res) => {
  const userId = req.isAuthenticated() ? (req.user as any)?.id : null;
  const orders = userId
    ? MOCK_ORDERS_DB.filter(o => o.userId === userId || o.userId === "demo")
    : MOCK_ORDERS_DB.filter(o => o.userId === "demo");
  res.json({ orders, total: orders.length });
});

// GET /api/orders/:id
router.get("/orders/:id", (req, res) => {
  const order = MOCK_ORDERS_DB.find(o => o.id === req.params.id);
  if (!order) {
    res.status(404).json({ error: "Order not found" });
    return;
  }
  res.json({ order });
});

// POST /api/orders — place a new order
router.post("/orders", (req, res) => {
  if (!req.isAuthenticated()) {
    res.status(401).json({ error: "Authentication required" });
    return;
  }
  const { serviceId, link, qty } = req.body;
  if (!serviceId || !link || !qty) {
    res.status(400).json({ error: "Missing required fields: serviceId, link, qty" });
    return;
  }
  const newOrder = {
    id: `ORD-${Math.floor(Math.random() * 9000 + 1000)}`,
    userId: (req.user as any)?.id,
    service: `Service #${serviceId}`,
    platform: "instagram",
    qty: Number(qty),
    status: "Pending",
    progress: 0,
    chargeNaira: Math.floor((Number(qty) * 1360) / 1000),
    delivered: 0,
    link,
    createdAt: new Date().toISOString(),
  };
  MOCK_ORDERS_DB.unshift(newOrder);
  res.status(201).json({ order: newOrder, message: "Order placed successfully" });
});

// GET /api/user/balance
router.get("/user/balance", (req, res) => {
  if (!req.isAuthenticated()) {
    res.json({ balance: 0, currency: "NGN" });
    return;
  }
  res.json({ balance: 0, currency: "NGN", user: req.user });
});

// POST /api/user/fund — fund wallet (Paystack callback)
router.post("/user/fund", (req, res) => {
  const { reference, amount } = req.body;
  if (!reference) {
    res.status(400).json({ error: "Missing Paystack reference" });
    return;
  }
  res.json({ success: true, reference, credited: Number(amount) || 0, message: "Wallet funded. Credits will reflect shortly." });
});

// Admin: GET /api/admin/stats
router.get("/admin/stats", (req, res) => {
  res.json({
    totalOrders: MOCK_ORDERS_DB.length,
    totalRevenue: MOCK_ORDERS_DB.filter(o => o.status === "Completed").reduce((a, o) => a + o.chargeNaira, 0),
    activeOrders: MOCK_ORDERS_DB.filter(o => o.status === "Active").length,
    pendingOrders: MOCK_ORDERS_DB.filter(o => o.status === "Pending").length,
  });
});

// Admin: GET /api/admin/orders
router.get("/admin/orders", (req, res) => {
  res.json({ orders: MOCK_ORDERS_DB, total: MOCK_ORDERS_DB.length });
});

export default router;
