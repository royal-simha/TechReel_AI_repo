# TechReel AI — Intelligent Technology Reel Recommendation Agent

TechReel AI is an AI-powered recommendation agent that analyzes simulated short-form Reel interactions from a college student, infers the student's broader underlying technology interests, and recommends useful technology-related Reels.

---

## 🌟 Key Differentiator

**DO NOT simply recommend what the student watched.**

Instead of recommending more Java memes to a student who watched a Java meme:

```
Java Meme (Watch: 95%, Save: Yes)
Coding Interview (Watch: 90%, Like: Yes)
Software Engineer Lifestyle (Watch: 92%, Save: Yes)
Laptop Comparison (Watch: 87%, Save: Yes)

                      ↓
          Hierarchical Taxonomy
                      ↓

        PRIMARY BROADER INTEREST:
          Software Engineering (91% Confidence)

                      ↓

        USEFUL TARGETED RECOMMENDATION:
"How Developers Choose the Right Laptop for Coding"
```

---

## 🚀 Features

1. **Simulated Reel Interactions Engine**: Real-time scoring using weighted interaction signals:
   - Save: +5, Rewatch: +4, Share: +4, Like: +3, Comment: +2
   - Watch >80%: +3, Watch 50–80%: +1, Watch <20%: -3, Skip: -2

2. **Hierarchical Broader Interest Inference**: Traverses multi-level topic taxonomies to extract high-level domain objectives.

3. **Dynamic Interest Profile & Visual Graph**: Real-time calculated interest vector and interactive visual graph.

4. **8-Component Recommendation Scoring Formula**:
   $$\text{Final Score} = 0.35 \times \text{InterestMatch} + 0.20 \times \text{SemanticSim} + 0.15 \times \text{EduValue} + 0.10 \times \text{CareerRel} + 0.10 \times \text{Quality} + 0.05 \times \text{Novelty} + 0.05 \times \text{Engagement} - 0.20 \times \text{HypeDeduction}$$

5. **Hype & Quality Filter**: Dedicated quality evaluator that automatically detects and rejects clickbait or unrealistic claims (e.g. rejecting *"10 AI Tools That Will Get You a Job"*).

6. **Explainable AI ("Why This?")**: Transparent evidence-based reasoning chain and score breakdown.

7. **Interactive Feedback Loop**: Dynamic recalibration of interest weights based on user feedback (👍 Useful, 👎 Not Relevant, ❤️ More Like This, 🚫 Don't Recommend).

8. **Interactive Reel Player with AI Visual Breakdowns**: Real-time video player simulation displaying code snippets, terminal commands, visual scene scripts, and AI key takeaways for all 8 Reels.

9. **Live Next.js API Routes**: Dedicated server endpoints (`/api/analyze`, `/api/recommend`, `/api/feedback`).

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Lucide Icons
- **AI Integration**: Google Generative AI (Gemini API) with built-in NLP fallback
- **State Management**: React Context

---

## 🚀 How to Run Locally

1. **Clone repository & install dependencies**:
   ```bash
   git clone https://github.com/your-username/techreel-ai.git
   cd techreel-ai
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```

3. **Open Application**:
   Navigate to [http://localhost:3000](http://localhost:3000).

---

## 🌐 Deploying to Vercel (Recommended)

1. Push your code to GitHub / GitLab / Bitbucket.
2. Go to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import your `techreel-ai` repository.
4. Add Environment Variable (Optional):
   - `GEMINI_API_KEY`: *(Your Google Gemini API Key)*
5. Click **Deploy**. Vercel will automatically build and host the application!

---

## 🔑 Environment Variables

Copy `.env.example` to `.env.local`:

```env
# Optional Gemini API Key
GEMINI_API_KEY=your_gemini_api_key_here
```
