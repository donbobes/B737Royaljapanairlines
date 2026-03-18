import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { UtensilsCrossed, Coffee } from "lucide-react"

export default function InflightMenuPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
                <UtensilsCrossed className="w-8 h-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-foreground">Inflight Dining Menu</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We offer a variety of meals specific to your tastes, dietary specifications, and cultural preferences.
            </p>
          </div>

          {/* Japanese Cuisine */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <UtensilsCrossed className="w-6 h-6 text-primary" />
                Japanese Cuisine
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Appetizers</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Edamame with Sea Salt - Steamed young soybeans lightly salted</li>
                  <li>• Seaweed Salad with Sesame Dressing - Mixed wakame and nori with sesame oil</li>
                  <li>• Chawanmushi - Savory egg custard with shrimp & mushroom</li>
                  <li>• Tuna & Salmon Sashimi - With soy sauce and wasabi</li>
                  <li>• Gyoza Dumplings - Pork or vegetable, pan-fried</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Main Courses</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>
                    • Grilled Teriyaki Salmon with Steamed Rice - Salmon fillet glazed with teriyaki sauce, served with
                    steamed white rice, pickled vegetables, and miso soup
                  </li>
                  <li>
                    • Chicken Katsu Curry - Breaded chicken cutlet with Japanese curry, served with steamed rice and
                    shredded cabbage
                  </li>
                  <li>• Unagi Don - Grilled eel over rice with sweet soy sauce</li>
                  <li>• Wagyu Beef Sukiyaki with Udon</li>
                  <li>• Miso-Glazed Black Cod with Steamed Rice</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Western Cuisine */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <UtensilsCrossed className="w-6 h-6 text-primary" />
                Western Cuisine
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Appetizers</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Caesar Salad with Parmesan and Croutons</li>
                  <li>• Smoked Salmon on Rye Bread</li>
                  <li>• Tomato Basil Soup</li>
                  <li>• Smoked Duck Breast with Cranberry Sauce</li>
                  <li>• Garlic Bread with Herb Butter</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Main Courses</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>
                    • Beef Tenderloin with Red Wine Sauce - Grilled beef tenderloin, served alongside mashed potatoes,
                    seasonal vegetables, and washed down with red wine
                  </li>
                  <li>
                    • Chicken Alfredo Pasta - Fettuccine tossed with creamy Alfredo sauce and grilled chicken breast,
                    garnished with parmesan cheese
                  </li>
                  <li>• Roast Chicken with Rosemary Potatoes & Vegetables</li>
                  <li>• Grilled Ribeye Steak with Peppercorn Sauce</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Asian Cuisine */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <UtensilsCrossed className="w-6 h-6 text-primary" />
                Asian Cuisine
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Appetizers</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Spring Rolls with Sweet Chili Sauce</li>
                  <li>• Dim Sum Assortment - Steamed Shrimp & Pork Dumplings</li>
                  <li>• Satay Skewers - Chicken & beef, served with peanut sauce</li>
                  <li>• Kimchi Pancake - Korean jeon</li>
                  <li>• Vietnamese Rice Paper Rolls - Shrimp, herbs, vermicelli</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Main Courses</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>
                    • Thai Green Curry with Jasmine Rice - Choice of chicken, shrimp, or tofu, with coconut green curry
                    sauce, served with steamed jasmine rice
                  </li>
                  <li>
                    • Korean Bibimbap - Mixed rice with sautéed vegetables, choice of beef or tofu, topped with fried
                    egg and gochujang sauce
                  </li>
                  <li>• Malaysian Nasi Lemak - Coconut rice, sambal, fried anchovies, chicken rendang</li>
                  <li>• Indian Butter Chicken with Basmati Rice & Naan</li>
                  <li>• Chinese Mapo Tofu - Spicy Sichuan tofu with rice, vegetarian option available</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Vegetarian Options */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <UtensilsCrossed className="w-6 h-6 text-primary" />
                Vegetarian Options
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Appetizers</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Caprese Salad</li>
                  <li>• Vegetable Spring Rolls</li>
                  <li>• Roasted Pumpkin Soup</li>
                  <li>• Greek Salad with Feta & Olives</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Main Courses</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>
                    • Vegetable Stir-Fry with Tofu - Seasonal vegetables sautéed with tofu in a light soy-ginger sauce,
                    served with brown rice
                  </li>
                  <li>• Mushroom Risotto - Creamy Arborio rice cooked with wild mushrooms and parmesan cheese</li>
                  <li>• Eggplant Parmesan with Spaghetti</li>
                  <li>• Tofu & Vegetable Hot Pot - Japanese-style nabe</li>
                  <li>• Spinach & Ricotta Ravioli with Tomato Basil Sauce</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Beverages */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Coffee className="w-6 h-6 text-primary" />
                Beverage Selection
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Non-Alcoholic Beverages</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Soft Drinks</h4>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>• Coca-Cola, Diet Coke, Coca-Cola Zero</li>
                      <li>• Sprite / 7UP</li>
                      <li>• Ginger Ale</li>
                      <li>• Tonic Water / Soda Water</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Juices</h4>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>• Orange Juice</li>
                      <li>• Apple Juice</li>
                      <li>• Pineapple Juice</li>
                      <li>• Tomato Juice</li>
                      <li>• Cranberry Juice</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Water</h4>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>• Mineral Water (Still)</li>
                      <li>• Sparkling Water</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Hot Beverages</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Freshly Brewed Coffee (Regular / Decaf)</li>
                  <li>• Espresso, Cappuccino, Café Latte (Premium Classes)</li>
                  <li>• Japanese Sencha Green Tea</li>
                  <li>• Matcha Latte (Business and First Class)</li>
                  <li>• Peppermint Tea</li>
                  <li>• English Breakfast Tea</li>
                  <li>• Chamomile Tea</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary bg-primary/5">
            <CardContent className="py-6">
              <p className="text-center text-sm text-muted-foreground">
                Menu items may vary by route and cabin class. Special dietary requirements can be requested at the time
                of booking. Please inform our crew of any allergies or dietary restrictions.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
