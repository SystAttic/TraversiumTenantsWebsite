'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="py-12 px-6 sm:px-8 lg:px-12 bg-dark-bg1 border-t border-dark-border">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <span className="text-lg font-bold text-white">TRAVERSIUM</span>
              <span className="text-sm text-dark-textMuted">Tenants</span>
            </div>
            <p className="text-dark-textMuted text-sm">
              Manage tenants and tenant admin accounts
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-dark-textMuted hover:text-white transition-colors text-sm"
                >
                  Tenants
                </Link>
              </li>
              <li>
                <Link
                  href="/admin"
                  className="text-dark-textMuted hover:text-white transition-colors text-sm"
                >
                  Admin Dashboard
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">About</h3>
            <p className="text-dark-textMuted text-sm">
              Tenant management system for Traversium platform.
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-dark-border text-center">
          <p className="text-dark-textMuted text-sm">
            © {new Date().getFullYear()} Traversium. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

