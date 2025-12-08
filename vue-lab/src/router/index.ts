import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { ONBOARDING_STEPS } from '@/constants/onboarding'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/ContactView.vue')
    },
    {
      path: '/onboarding',
      redirect: '/onboarding/1'
    },
    {
      path: '/onboarding/:step',
      name: 'onboarding',
      component: () => import('../views/OnboardingView.vue'),
      props: (route) => ({ step: Number(route.params.step) }),
      meta: { layout: 'dating' }, // Маркер для ізоляції
      beforeEnter: (to, from, next) => {
        const step = Number(to.params.step)
        if (step >= 1 && step <= ONBOARDING_STEPS.length) {
          next()
        } else {
          next({ name: 'onboarding', params: { step: 1 } })
        }
      },
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('../views/AuthView.vue'),
      meta: { layout: 'dating' } // Маркер для ізоляції
    }
  ]
})

export default router
