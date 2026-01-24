# 🚀 Plutux Vault - Future Roadmap

This document outlines proposed features and enhancements to elevate the capabilities of the Plutux Vault inventory management system.

## 🌟 Strategic Enhancements

### 1. 📍 Location Management (Geo-Tagging)

**Problem:** Assets exist but have no tracked physical location.
**Proposal:**

- Add `location` field to `AssetSchema`.
- Types: `String` (MVP) or `Enum` (e.g., "Main Office", "Warehouse A", "Remote").
- **Value:** Essential for physical audits and finding assets quickly.

### 2. 📝 Maintenance Log & Audit Trail

**Problem:** The `maintenance` status exists, but there is no record of "what, why, or when".
**Proposal:**

- Create `MaintenanceLog` entity linked to `Asset`.
- Track: `date`, `description`, `cost`, `technician`.
- **Value:** Critical for warranty tracking and lifecycle management.

### 3. 📸 Deep QR Integration

**Problem:** Review scanner usage. Currently exists but can be more powerful.
**Proposal:**

- **Search:** Scan to find an asset in the dashboard immediately.
- **Entry:** Scan a barcode during creation to auto-fill `serialNumber`.
- **Action:** Scan to quickly update status (e.g., Check-in/Check-out).

### 4. 📉 Financial Depreciation (Amortization)

**Problem:** `Value` is static and doesn't reflect aging.
**Proposal:**

- Implement "Straight-Line Depreciation" calculation.
- Display "Current Estimated Value" vs "Purchase Price" in Dashboard.
- **Value:** Provides immediate financial insight into asset portfolio health.

### 5. 📤 Data Sovereignty (Export/Import)

**Problem:** `LocalStorage` is volatile. Clearing cache wipes data.
**Proposal:**

- **Export:** Download inventory as JSON/CSV.
- **Import:** Restore inventory from a file.
- **Value:** Critical data safety feature for a client-side only application.
