import { supabase } from "../../lib/supaBase";

type CartItem = {
  id: string;
  name: string;
  price: number;
  image_url: string;
  category: string;
  quantity: number;
};



export const addToCart = async (productId: string) => {
  console.log("[addToCart] Função chamada com productId:", productId);

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    console.error("[addToCart] Erro ao obter usuário:", userError);
  }

  if (!user) {
    alert("Você precisa estar logado para adicionar ao carrinho.");
    return;
  }

  console.log("[addToCart] Usuário logado:", user.id);

  const { data: existingItem, error: selectError } = await supabase
    .from("cart_items")
    .select("*")
    .eq("user_id", user.id)
    .eq("product_id", productId)
    .single();

  if (selectError && selectError.code !== "PGRST116") { // PGRST116 = no rows found (não é erro crítico)
    console.error("[addToCart] Erro ao buscar item existente:", selectError);
  } else {
    console.log("[addToCart] Item existente no carrinho:", existingItem);
  }

  const quantity = 1;

  if (existingItem) {
    console.log("[addToCart] Item já existe, atualizando quantidade...");
    const { data, error: updateError } = await supabase
      .from("cart_items")
      .update({ quantity: existingItem.quantity + quantity })
      .match({
        id: existingItem.id,
        user_id: user.id,       // importante garantir que o usuário seja o dono
      });

    if (updateError) {
      console.error("[addToCart] Erro ao atualizar item:", updateError);
    } else {
      console.log("[addToCart] Item atualizado com sucesso:", data);
    }
  } else {
    console.log("[addToCart] Inserindo novo item no carrinho...");
    const { data, error: insertError } = await supabase.from("cart_items").insert([
      {
        user_id: user.id,
        product_id: productId,
        quantity,
      },
    ]);

    if (insertError) {
      console.error("[addToCart] Erro ao inserir item:", insertError);
    } else {
      console.log("[addToCart] Item inserido com sucesso:", data);
    }
  }
};


export const fetchCartItems = async () => {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    console.error("Erro ao obter usuário:", userError);
    return [];
  }

  if (!user) {
    console.warn("Usuário não está logado ao buscar carrinho.");
    return [];
  }

  const { data, error } = await supabase
    .from("cart_items")
    .select("id, quantity, products(*)") // join automático com products
    .eq("user_id", user.id);

  if (error) {
    console.error("Erro ao buscar carrinho:", error);
    return [];
  }


  return data;
};


