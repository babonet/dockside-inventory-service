# dockside-inventory-service

Tracks stock levels and reservations for **Dockside Market**.

| | |
|---|---|
| Owner | Fulfillment team |
| Tier | 2 |
| Called by | `dockside-checkout-api` |

## API

| Method | Path | Description |
|---|---|---|
| `GET` | `/health` | Liveness and version |
| `GET` | `/inventory/:sku` | Stock level for a SKU |
| `POST` | `/inventory/reserve` | Reserve stock for an order |

## Run locally

```bash
npm start
npm test
npm run smoke
```

## Delivery pipeline

`ci.yml` (PR tests), `deploy.yml` (rollout + post-deploy smoke test, raises an `alert` issue on failure), `rollback.yml` and `followup.yml` (dispatched by Port).

> Part of the Dockside Market demo for Port's **self-healing incidents** solution. The production rollout is simulated inside the GitHub Actions runner.
