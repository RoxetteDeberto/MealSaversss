import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCharitiesStore = defineStore('charities', () => {
  const charities = ref([
    {
      id: 1,
      name: 'Food Bank Foundation',
      description: 'Providing food assistance to those in need through community partnerships.',
      image: 'https://picsum.photos/300/200',
      impact: 'Served 10,000+ families in 2023',
      location: 'New York, NY',
      website: 'https://example.com/foodbank',
      contact: {
        email: 'contact@foodbank.org',
        phone: '(555) 123-4567'
      },
      programs: [
        'Emergency Food Assistance',
        'Community Food Distribution',
        'Nutrition Education'
      ]
    },
    {
      id: 2,
      name: 'Community Kitchen',
      description: 'Operating community kitchens to provide hot meals to homeless individuals.',
      image: 'https://picsum.photos/300/200',
      impact: 'Served 5,000+ meals monthly',
      location: 'Los Angeles, CA',
      website: 'https://example.com/communitykitchen',
      contact: {
        email: 'info@communitykitchen.org',
        phone: '(555) 234-5678'
      },
      programs: [
        'Hot Meal Program',
        'Food Recovery',
        'Volunteer Training'
      ]
    },
    {
      id: 3,
      name: 'Meal Rescue Network',
      description: 'Rescuing surplus food from restaurants and redistributing to those in need.',
      image: 'https://picsum.photos/300/200',
      impact: 'Rescued 20,000+ pounds of food',
      location: 'Chicago, IL',
      website: 'https://example.com/mealrescue',
      contact: {
        email: 'help@mealrescue.org',
        phone: '(555) 345-6789'
      },
      programs: [
        'Food Rescue Program',
        'Restaurant Partnerships',
        'Food Distribution Network'
      ]
    }
  ])

  const selectedCharity = ref(null)

  const setSelectedCharity = (charity) => {
    selectedCharity.value = charity
  }

  const clearSelectedCharity = () => {
    selectedCharity.value = null
  }

  const getCharityById = (id) => {
    return charities.value.find(charity => charity.id === id)
  }

  return {
    charities,
    selectedCharity,
    setSelectedCharity,
    clearSelectedCharity,
    getCharityById
  }
}) 