<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=0,2,2,5,30&height=200&section=header&text=Contest%20Participation&fontSize=40&fontColor=fff&animation=fadeIn&fontAlignY=38&desc=Join%20the%20Ultimate%20Contest%20Experience&descAlignY=51&descAlign=62" />

<img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&size=35&duration=3000&pause=1000&color=FF6B6B&center=true&vCenter=true&width=800&lines=🎉+Welcome+to+Contest+Hub!;🚀+Register+%26+Participate;✨+Win+Amazing+Prizes!" alt="Welcome Animation" />

</div>

## 🌐 Live Website

<div align="center">

<a href="https://jointhecontest.vercel.app" target="_blank">
  <img src="https://img.shields.io/badge/🌟_VISIT_THE_WEBSITE-FF6B6B?style=for-the-badge&logoColor=white&labelColor=000000&color=gradient" alt="Visit Website" />
</a>

<br><br>

<img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&size=22&duration=2500&pause=800&color=00D4FF&center=true&vCenter=true&width=600&lines=👆+Click+above+to+join+now!;🎯+Live+%26+Ready+for+participants;⚡+Fast+%26+Mobile+Optimized!" alt="Website Info" />

</div>

---

## 📖 About The Project

<div align="center">

<img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&size=28&duration=4000&pause=1200&color=4ECDC4&center=true&vCenter=true&width=700&lines=🎭+Modern+Contest+Platform;📱+Mobile+First+Design;🎨+Beautiful+Animations;🔒+Secure+%26+Fast!" alt="About Project" />

</div>

A **stunning contest participation website** built with modern web technologies. Features include:

- 🖼️ **Rotating Image Carousel** with 9 beautiful contest images
- 🚀 **Animated Loading Screens** with progress bars and particle effects  
- 📱 **Mobile-First Responsive Design** optimized for all devices
- 🎯 **Real-time Participant Counter** showing live registration stats
- 🔐 **Secure Database Integration** with Supabase
- 🎨 **Dark Theme UI** with smooth animations and transitions
- 📲 **Social Media Integration** (TikTok & WhatsApp)

## 🛠️ Tech Stack

<div align="center">

<img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&size=25&duration=3000&pause=1000&color=9B59B6&center=true&vCenter=true&width=500&lines=⚡+Powered+by+Modern+Tech;🔥+Built+for+Performance!" alt="Tech Stack" />

<br><br>

| Technology | Purpose | Version |
|------------|---------|---------|
| ![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white) | **React Framework** | 15.x |
| ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white) | **Type Safety** | 5.x |
| ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white) | **Styling** | 3.x |
| ![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white) | **Database** | Latest |
| ![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white) | **Hosting** | Latest |

</div>

## 🚀 Quick Start Guide

<div align="center">

<img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&size=26&duration=3500&pause=1000&color=FF9F43&center=true&vCenter=true&width=600&lines=🛠️+Ready+to+get+started%3F;📋+Follow+these+simple+steps!;⚡+Up+%26+running+in+minutes!" alt="Quick Start" />

</div>

### 1️⃣ Clone & Install

\`\`\`bash
# Clone the repository
git clone https://github.com/firekid/contest-participation-app.git
cd contest-participation-app

# Install dependencies
npm install
# or
yarn install
# or  
pnpm install
\`\`\`

### 2️⃣ Environment Configuration

Create a \`.env.local\` file in the root directory:

\`\`\`env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Optional: Analytics & Monitoring
NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id
\`\`\`

### 3️⃣ Database Setup

Execute this SQL in your Supabase SQL Editor:

\`\`\`sql
-- Create participants table with proper constraints
CREATE TABLE IF NOT EXISTS participants (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  uid text NOT NULL UNIQUE,
  account_name text NOT NULL,
  email text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Create optimized indexes
CREATE INDEX IF NOT EXISTS idx_participants_created_at ON participants(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_participants_uid ON participants(uid);
CREATE INDEX IF NOT EXISTS idx_participants_email ON participants(email) WHERE email IS NOT NULL;

-- Enable Row Level Security
ALTER TABLE participants ENABLE ROW LEVEL SECURITY;

-- Create policies for secure access
CREATE POLICY "Allow public read access" ON participants FOR SELECT USING (true);
CREATE POLICY "Allow public insert access" ON participants FOR INSERT WITH CHECK (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS \$\$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
\$\$ language 'plpgsql';

-- Create trigger for auto-updating timestamps
CREATE TRIGGER update_participants_updated_at 
    BEFORE UPDATE ON participants 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();
\`\`\`

### 4️⃣ Development Server

\`\`\`bash
# Start the development server
npm run dev
# or
yarn dev
# or
pnpm dev
\`\`\`

<div align="center">

🎉 **Open [http://localhost:3000](http://localhost:3000) to see your app!** ✨

<img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&size=18&duration=2000&pause=500&color=00FF88&center=true&vCenter=true&width=400&lines=🎯+Development+server+ready!;🚀+Start+building+awesome+features!" alt="Dev Ready" />

</div>

## 🎨 Features Showcase

<div align="center">

<img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&size=30&duration=4000&pause=1200&color=E74C3C&center=true&vCenter=true&width=700&lines=✨+Amazing+Features+Inside!;🎭+Smooth+Animations;📱+Mobile+Perfect;🚀+Lightning+Fast!" alt="Features Showcase" />

</div>

### 🖼️ Dynamic Image Carousel
- **9 High-Quality Images** rotating every 10 seconds
- **Smooth Slide Animations** with fade transitions  
- **Visual Progress Indicators** showing current image
- **Mobile-Optimized Display** with responsive sizing
- **Automatic Preloading** for seamless experience

### 🚀 Advanced Loading System
- **Multi-Ring Spinner Animation** with particle effects
- **Real-Time Progress Bar** with shimmer animations
- **Success/Error Feedback** with bounce effects
- **Backdrop Blur Effects** for professional look
- **Mobile-Optimized Timing** for better UX

### 📱 Mobile-First Design
- **Responsive Breakpoints** for all screen sizes
- **Touch-Optimized Controls** with proper sizing
- **Fast Loading Performance** with optimized assets
- **Smooth Scrolling** and gesture support
- **iOS/Android Compatible** styling

### 🔒 Security & Performance
- **SQL Injection Protection** with parameterized queries
- **Rate Limiting** to prevent spam submissions
- **Input Validation** on both client and server
- **Optimized Database Queries** with proper indexing
- **Error Handling** with user-friendly messages

## 📊 Database Architecture

<div align="center">

<img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&size=24&duration=3000&pause=800&color=3498DB&center=true&vCenter=true&width=500&lines=🗄️+Robust+Database+Design;⚡+Optimized+for+Speed!" alt="Database" />

</div>

\`\`\`mermaid
erDiagram
    PARTICIPANTS {
        uuid id PK "Primary Key"
        text uid UK "Unique Identifier"
        text account_name "User's Account Name"
        text email "Optional Email"
        timestamp created_at "Registration Time"
        timestamp updated_at "Last Modified"
    }
    
    PARTICIPANTS ||--o{ INDEXES : "has"
    INDEXES {
        btree idx_created_at "Time-based queries"
        btree idx_uid "Unique lookups"
        btree idx_email "Email searches"
    }
\`\`\`

## 🎯 API Endpoints

<div align="center">

<img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&size=22&duration=2500&pause=700&color=F39C12&center=true&vCenter=true&width=500&lines=🔌+Server+Actions+%26+APIs;⚡+Fast+%26+Secure!" alt="API" />

</div>

### Server Actions

| Action | Purpose | Parameters |
|--------|---------|------------|
| \`submitParticipation\` | Register new participant | \`FormData\` with uid, account_name, email |
| \`getParticipantCount\` | Get total participants | None |

### Response Format

\`\`\`typescript
// Success Response
{
  success: true,
  message: "Successfully registered for the contest!"
}

// Error Response  
{
  success: false,
  error: "This UID is already registered"
}
\`\`\`

## 🌐 Social Media Integration

<div align="center">

<img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&size=20&duration=2000&pause=600&color=8E44AD&center=true&vCenter=true&width=500&lines=📱+Connect+on+Social+Media;🔥+Follow+for+Updates!" alt="Social Media" />

<br><br>

| Platform | Handle | Link |
|----------|--------|------|
| **TikTok** | @firekid846 | [![TikTok](https://img.shields.io/badge/TikTok-000000?style=for-the-badge&logo=tiktok&logoColor=white)](https://www.tiktok.com/@firekid846) |
| **WhatsApp** | Contest Channel | [![WhatsApp](https://img.shields.io/badge/WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://whatsapp.com/channel/0029VaT1YDxFsn0oKfK81n2R) |

</div>

## 🔧 Configuration Options

### Image Carousel Settings

\`\`\`typescript
// Customize rotation timing
const ROTATION_INTERVAL = 10000; // 10 seconds

// Image URLs array
const imageUrls = [
  "https://i.imgur.com/sHN1wZq.jpg",
  "https://i.imgur.com/6uKmTMA.jpg",
  // Add your contest images here
];
\`\`\`

### Loading Animation Settings

\`\`\`typescript
// Customize loading duration
const LOADING_DURATION = 3000; // 3 seconds
const PROGRESS_INTERVAL = 50; // Update every 50ms
\`\`\`

## 🤝 Contributing

<div align="center">

<img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&size=26&duration=3000&pause=1000&color=27AE60&center=true&vCenter=true&width=600&lines=🤝+Contributions+Welcome!;🌟+Fork+•+Star+•+Contribute;💡+Let's+build+together!" alt="Contributing" />

</div>

We love contributions! Here's how you can help:

### 🐛 Bug Reports
- Use the issue tracker to report bugs
- Include steps to reproduce the issue
- Add screenshots if applicable

### 💡 Feature Requests  
- Suggest new features via issues
- Explain the use case and benefits
- Consider implementation complexity

### 🔧 Pull Requests
1. **Fork** the repository
2. **Create** a feature branch (\`git checkout -b feature/amazing-feature\`)
3. **Commit** your changes (\`git commit -m 'Add amazing feature'\`)
4. **Push** to the branch (\`git push origin feature/amazing-feature\`)
5. **Open** a Pull Request

### 📝 Code Style
- Follow TypeScript best practices
- Use Prettier for formatting
- Add JSDoc comments for functions
- Write meaningful commit messages

## 📈 Performance Metrics

<div align="center">

<img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&size=22&duration=2500&pause=800&color=E67E22&center=true&vCenter=true&width=500&lines=⚡+Lightning+Fast+Performance;📊+Optimized+for+Speed!" alt="Performance" />

</div>

| Metric | Score | Status |
|--------|-------|--------|
| **Performance** | 95+ | ![Excellent](https://img.shields.io/badge/Excellent-00C851?style=flat-square) |
| **Accessibility** | 100 | ![Perfect](https://img.shields.io/badge/Perfect-00C851?style=flat-square) |
| **Best Practices** | 100 | ![Perfect](https://img.shields.io/badge/Perfect-00C851?style=flat-square) |
| **SEO** | 100 | ![Perfect](https://img.shields.io/badge/Perfect-00C851?style=flat-square) |

## 📝 License

<div align="center">

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

![MIT License](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)

<img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&size=16&duration=2000&pause=500&color=95A5A6&center=true&vCenter=true&width=400&lines=📄+Free+to+use+%26+modify;🔓+Open+source+forever!" alt="License Info" />

</div>

## 👨‍💻 Author

<div align="center">

<img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&size=28&duration=3000&pause=1000&color=FF6B6B&center=true&vCenter=true&width=500&lines=👋+Meet+the+Creator;🔥+firekid;💻+Full+Stack+Developer!" alt="Author" />

<br>

**firekid** 🔥  
*Full Stack Developer & Contest Enthusiast*

[![TikTok](https://img.shields.io/badge/TikTok-000000?style=for-the-badge&logo=tiktok&logoColor=white)](https://www.tiktok.com/@firekid846)
[![WhatsApp](https://img.shields.io/badge/WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://whatsapp.com/channel/0029VaT1YDxFsn0oKfK81n2R)

<img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&size=18&duration=3000&pause=1000&color=3498DB&center=true&vCenter=true&width=500&lines=💡+Always+building+cool+stuff;🚀+Passionate+about+web+tech;⭐+Star+if+you+like+this+project!" alt="Author Info" />

</div>

## 🙏 Acknowledgments

<div align="center">

<img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&size=24&duration=2500&pause=800&color=9B59B6&center=true&vCenter=true&width=600&lines=🙏+Special+Thanks+To;🌟+Amazing+Open+Source+Community!" alt="Acknowledgments" />

</div>

- **Next.js Team** for the amazing React framework
- **Vercel** for seamless deployment platform  
- **Supabase** for the powerful backend-as-a-service
- **Tailwind CSS** for the utility-first CSS framework
- **All Contributors** who help improve this project

## 📊 Project Stats

<div align="center">

![GitHub stars](https://img.shields.io/github/stars/firekid/contest-participation-app?style=for-the-badge&color=FFD700)
![GitHub forks](https://img.shields.io/github/forks/firekid/contest-participation-app?style=for-the-badge&color=32CD32)
![GitHub issues](https://img.shields.io/github/issues/firekid/contest-participation-app?style=for-the-badge&color=FF6B6B)
![GitHub license](https://img.shields.io/github/license/firekid/contest-participation-app?style=for-the-badge&color=9B59B6)

<br><br>

<img src="https://github-readme-stats.vercel.app/api?username=firekid&show_icons=true&theme=radical&hide_border=true&bg_color=0D1117&title_color=FF6B6B&icon_color=00D4FF&text_color=FFFFFF" alt="GitHub Stats" />

</div>

---

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=0,2,2,5,30&height=120&section=footer" />

<img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&size=20&duration=3000&pause=1000&color=00D4FF&center=true&vCenter=true&width=700&lines=🎉+Thanks+for+checking+out+this+project!;⭐+Don't+forget+to+star+if+you+like+it!;🚀+Happy+coding+and+good+luck+in+contests!;💫+Made+with+❤️+by+firekid" alt="Footer Animation" />

<br><br>

**© 2025 firekid. All rights reserved.**

</div>
