import { Component } from '@angular/core';
import { LogoComponent } from '../logo/logo.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [LogoComponent],
  template: `
    <footer class="bg-sa-blue-dark text-white mt-auto">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <!-- Brand -->
          <div class="col-span-1 md:col-span-2">
            <div class="mb-4">
              <app-logo size="llg" />
            </div>
            <p class="text-sa-gray-400 text-sm leading-relaxed max-w-md">
              Southern Automation is a leading industrial automation company providing cutting-edge solutions
              in PLC programming, SCADA systems, IoT, and Industry 4.0 technologies.
            </p>
          </div>

          <!-- Quick Links -->
          <div>
            <h4 class="text-sm font-semibold uppercase tracking-wider text-sa-gray-300 mb-4">Quick Links</h4>
            <ul class="space-y-2 text-sm text-sa-gray-400">
              <li><a href="#" class="hover:text-sa-orange transition-colors">About Us</a></li>
              <li><a href="#" class="hover:text-sa-orange transition-colors">Our Services</a></li>
              <li><a href="#" class="hover:text-sa-orange transition-colors">Projects</a></li>
              <li><a href="#" class="hover:text-sa-orange transition-colors">Contact</a></li>
            </ul>
          </div>

          <!-- Contact -->
          <div>
            <h4 class="text-sm font-semibold uppercase tracking-wider text-sa-gray-300 mb-4">Contact</h4>
            <ul class="space-y-2 text-sm text-sa-gray-400">
              <li class="flex items-center gap-2">
                <span class="material-icons-outlined text-base">email</span>
                careers&#64;southernautomation.com
              </li>
              <li class="flex items-center gap-2">
                <span class="material-icons-outlined text-base">phone</span>
                +91 44 2345 6789
              </li>
              <li class="flex items-center gap-2">
                <span class="material-icons-outlined text-base">location_on</span>
                Chennai, India
              </li>
            </ul>
          </div>
        </div>

        <div class="mt-10 pt-6 border-t border-white/10 text-center text-sm text-sa-gray-500">
          &copy; {{ currentYear }} Southern Automation. All rights reserved.
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}
