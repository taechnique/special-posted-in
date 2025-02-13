import {defineStore} from "pinia";
import type ICategoryNode from "@/classes/i-category-node";
import type {PostMetadata} from "@/classes/implement/PostMetadata";
import CategoryGroup from "@/classes/implement/category-group";
import CategoryContent from "@/classes/implement/category-content";

export const useCategoriesStore = defineStore('categories', () => {

    const categoryTree = ref<Array<ICategoryNode>>(new Array<ICategoryNode>());

    function initialize(posts: Array<PostMetadata>): void {
        posts.filter(post => post.header.categories?.length > 0)
            .forEach(post => {
            const foundGroup = findOrCreateGroup(categoryTree.value, post.header.categories, 0);
            foundGroup.addChild(new CategoryContent(false, post.header.title, post.path));
        });
    }

    function findOrCreateGroup(existingGroups: Array<ICategoryNode>, categories: Array<string>, depth: number): CategoryGroup {
        const currentGroup = categories[depth];
        const found = existingGroups.find(exist => exist.isDirectory && exist.name === currentGroup);
        //존재하지 않는 경우 생성
        if (!found) {
            const newGroup = new CategoryGroup(true, currentGroup, false);
            existingGroups.push(newGroup);
            if (categories.length -1 === depth) {
                return newGroup;
            }
            return findOrCreateGroup(newGroup.children, categories, depth +1);
        }

        const exist = found as CategoryGroup;
        //마지막 인덱스인경우 찾았으므로 처리
        if (categories.length -1 === depth) {
            return exist;
        }

        return findOrCreateGroup(exist.children, categories, depth +1);
    }

    return {
        categoryTree,
        initialize
    }
});
