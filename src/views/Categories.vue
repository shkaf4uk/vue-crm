<template>
  <div>
    <div class="page-title">
      <h3>{{ 'Categories' | localize }}</h3>
    </div>
    <section>
      <Loader v-if="loading" />
      <div class="row" v-else>
        <CategoryCreate @created="addNewCatedory" />

        <CategoryEdit
          v-if="categories.length"
          :categories="categories"
          @updated="updateCategories"
          :key="categories.length + updateCount"
        />
        <p v-else>{{ 'No_categories_yet' | localize }}</p>
      </div>
    </section>
  </div>
</template>

<script>
import CategoryCreate from '@/components/CategoryCreate'
import CategoryEdit from '@/components/CategoryEdit'
import Loader from '@/components/app/Loader'

export default {
  metaInfo() {
    return {
      title: this.$title('Menu_Categories'),
    }
  },
  name: 'categories',
  data: () => ({
    categories: [],
    loading: true,
    updateCount: 0,
  }),
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories')
    this.loading = false
  },
  components: {
    CategoryCreate,
    CategoryEdit,
    Loader,
  },
  methods: {
    addNewCatedory(category) {
      this.categories.push(category)
    },
    updateCategories(category) {
      const index = this.categories.findIndex((c) => c.id === category.id)
      this.categories[index].title = category.title
      this.categories[index].limit = category.limit
      this.updateCount++
    },
  },
}
</script>
