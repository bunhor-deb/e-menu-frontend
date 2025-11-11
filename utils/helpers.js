export function saveLocalData(cart, checkoutId, checkoutUrl) {
  localStorage.setItem(
    process.env.NEXT_PUBLIC_LOCAL_STORAGE_NAME,
    JSON.stringify([cart, checkoutId, checkoutUrl])
  );
}

function getLocalData() {
  return JSON.parse(
    localStorage.getItem(process.env.NEXT_PUBLIC_LOCAL_STORAGE_NAME)
  );
}

export function setLocalData(setCart, setCheckoutId, setCheckoutUrl) {
  const localData = getLocalData();

  if (localData) {
    if (Array.isArray(localData[0])) {
      setCart([...localData[0]]);
    } else {
      setCart([localData[0]]);
    }
    setCheckoutId(localData[1]);
    setCheckoutUrl(localData[2]);
  }
}

export async function createShopifyCheckout(newItem) {
  // Create a local checkout object and persist it to localStorage so the
  // app can work without Shopify integration.
  const checkoutId = `local-${Date.now()}`;
  const checkoutUrl =
    typeof globalThis !== "undefined" && globalThis.location
      ? `${globalThis.location.origin}/?checkout=${checkoutId}`
      : `local://${checkoutId}`;

  const lineItems = [
    {
      variantId: newItem["variantId"],
      quantity: newItem["variantQuantity"],
      title: newItem["title"] || "",
    },
  ];

  // store checkouts under a separate key
  const key =
    (process.env.NEXT_PUBLIC_LOCAL_STORAGE_NAME || "e-menu") + ":checkouts";
  const all = JSON.parse(localStorage.getItem(key) || "{}");
  all[checkoutId] = { id: checkoutId, webUrl: checkoutUrl, lineItems };
  localStorage.setItem(key, JSON.stringify(all));

  return { id: checkoutId, webUrl: checkoutUrl };
}

export async function updateShopifyCheckout(updatedCart, checkoutId) {
  const lineItems = updatedCart.map((item) => ({
    variantId: item["variantId"],
    quantity: item["variantQuantity"],
    title: item["title"] || "",
  }));

  const key =
    (process.env.NEXT_PUBLIC_LOCAL_STORAGE_NAME || "e-menu") + ":checkouts";
  const all = JSON.parse(localStorage.getItem(key) || "{}");
  if (all[checkoutId] == null) {
    // create a new one if missing
    all[checkoutId] = {
      id: checkoutId,
      webUrl: `local://${checkoutId}`,
      lineItems,
    };
  } else {
    all[checkoutId].lineItems = lineItems;
  }
  localStorage.setItem(key, JSON.stringify(all));
  return all[checkoutId];
}

export function getCartSubTotal(cart) {
  if (cart.length === 0) {
    return 0;
  } else {
    let totalPrice = 0;
    for (const item of cart) {
      totalPrice +=
        Number.parseInt(item.variantQuantity) *
        Number.parseFloat(item.variantPrice);
    }
    return Math.round(totalPrice * 100) / 100;
  }
}
