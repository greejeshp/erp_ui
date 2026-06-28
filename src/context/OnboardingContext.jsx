import React, { createContext, useContext, useState } from 'react'

const OnboardingContext = createContext(null)

export function OnboardingProvider({ children }) {
  const [data, setData] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('pivotal_onboarding') || '{}')
    } catch { return {} }
  })

  // companies = array of { companyName, city, subdomain, industry, pan, ... }
  const [companies, setCompanies] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('pivotal_companies') || '[]')
    } catch { return [] }
  })

  const [activeCompanyIdx, setActiveCompanyIdx] = useState(() => {
    try {
      return parseInt(localStorage.getItem('pivotal_active_company') || '0', 10)
    } catch { return 0 }
  })

  const update = (fields) => {
    const next = { ...data, ...fields }
    setData(next)
    localStorage.setItem('pivotal_onboarding', JSON.stringify(next))
  }

  // Called when company + domain setup completes — saves company to list
  const saveCompany = (companyData) => {
    const existing = companies.findIndex(c => c.subdomain === companyData.subdomain)
    let next
    if (existing >= 0) {
      next = companies.map((c, i) => i === existing ? { ...c, ...companyData } : c)
    } else {
      next = [...companies, companyData]
    }
    setCompanies(next)
    const idx = next.length - 1
    setActiveCompanyIdx(idx)
    localStorage.setItem('pivotal_companies', JSON.stringify(next))
    localStorage.setItem('pivotal_active_company', String(idx))
  }

  const switchCompany = (idx) => {
    if (idx >= 0 && idx < companies.length) {
      setActiveCompanyIdx(idx)
      localStorage.setItem('pivotal_active_company', String(idx))
      // Also update the active data fields
      const comp = companies[idx]
      const next = { ...data, ...comp }
      setData(next)
      localStorage.setItem('pivotal_onboarding', JSON.stringify(next))
    }
  }

  const activeCompany = companies[activeCompanyIdx] || null

  const reset = () => {
    setData({})
    localStorage.removeItem('pivotal_onboarding')
  }

  return (
    <OnboardingContext.Provider value={{ data, update, reset, companies, saveCompany, switchCompany, activeCompanyIdx, activeCompany }}>
      {children}
    </OnboardingContext.Provider>
  )
}

export function useOnboarding() {
  return useContext(OnboardingContext)
}
