# פרויקט מתכונים (Recipes Project)

אפליקציית רשת לניהול מתכונים, המאפשרת למשתמשים להירשם, להתחבר, לצפות במתכונים ולהוסיף מתכונים חדשים.

הפרויקט בנוי בארכיטקטורת שרת-לקוח:
- **צד לקוח (Frontend):** אפליקציית React (נכתבה ב-TypeScript ו-Vite).
- **צד שרת (Backend):** שרת Node.js עם Express.js.

---

## 🛠️ טכנולוגיות

*   **צד לקוח:**
    *   React
    *   TypeScript
    *   Vite
*   **צד שרת:**
    *   Node.js
    *   Express.js
*   **בסיס נתונים:**
    *   קבצי JSON (לצורך הפשטות)

---

## 🚀 איך להתקין ולהריץ את הפרויקט

כדי להריץ את הפרויקט באופן מקומי, יש לבצע את השלבים הבאים עבור השרת ועבור הלקוח.

### 1. התקנה והרצת השרת (Backend)

```bash
# 1. נווטו לתיקיית השרת
cd nodeForRecipes

# 2. התקינו את התלויות
npm install

# 3. הריצו את השרת
npm start
```
השרת ירוץ בכתובת `http://localhost:3000`.

### 2. התקנה והרצת הלקוח (Frontend)

פתחו טרמינל חדש ובצעו את הפעולות הבאות:

```bash
# 1. נווטו לתיקיית הלקוח
cd loginUser

# 2. התקינו את התלויות
npm install

# 3. הריצו את אפליקציית הפיתוח
npm run dev
```
לאחר ההרצה, אפליקציית הלקוח תהיה זמינה בכתובת שתוצג בטרמינל (בדרך כלל `http://localhost:5173`).

---

## 📖 תיעוד API

אלו הן נקודות הקצה שהשרת חושף:

### משתמשים (Users)

*   **רישום משתמש חדש**
    - `POST /api/user/register`
    - גוף הבקשה: `{ "email": "user@example.com", "password": "password" }`

*   **התחברות**
    - `POST /api/user/login`
    - גוף הבקשה: `{ "email": "user@example.com", "password": "password" }`

*   **עדכון פרטי משתמש**
    - `PUT /api/user`
    - נדרש `user-id` ב-Headers של הבקשה.

### מתכונים (Recipes)

*   **קבלת כל המתכונים**
    - `GET /api/recipes`

*   **הוספת מתכון חדש**
    - `POST /api/recipes`
    - נדרש `user-id` ב-Headers של הבקשה.
    - גוף הבקשה: `{ "title": "Recipe Title", "description": "Recipe Description" }`
