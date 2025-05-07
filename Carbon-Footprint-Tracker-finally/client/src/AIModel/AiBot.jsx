import React from 'react'
// import { AiNavBar } from './AINavbar'
import AINavBar from './AINavbar';

import { Banner } from './Banner'
import { Skills } from './SKills'
import { Projects } from './projects'
import { Contact } from './Contact'
import { Footer } from './Footer'

export default function AiBot() {
  return (
    <div>
          <AINavBar />
      <Banner />
      <Skills />
      <Projects />
      <Contact />
      {/* <Footer /> */}
    </div>
  )
}
