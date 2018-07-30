const vm = new Vue({
    el: '#app',
    data: {
        isDoubleClick: false,
        todo: '',
        cur: '',
        todos: [{
                isCompleted: false,
                content: '这是第一条',
            },
            {
                isCompleted: false,
                content: '这是第一条',
            },
            {
                isCompleted: false,
                content: '这是第一条',
            },
            {
                isCompleted: false,
                content: '这是第一条',
            },
        ]
    },
    created() { //应用于ajax获取 初始化数据
        //如果localStorage有数据就用有的，没有就用默认的
        this.todos = JSON.parse(localStorage.getItem('data')) || this.todos;
    },
    watch: {
        //将数据存储到本地，一旦数据有变化，就更新本地存储
        //watch默认只监控一层的数据变化，我们希望深度监控，即以下写法
        //默认写成函数时，就相当于默认写handler
        todos: {
            handler() { //localStorage默认存放string，因此需要将数组或对象转化一下，用JSON.stringify
                localStorage.setItem('data', JSON.stringify(this.todos));
            },
            deep: true
        }
    },
    computed: {
        count() {
            return this.todos.filter(item => !item.isCompleted).length;
        }
    },
    methods: {
        remove(index) {
            this.todos = this.todos.filter((item, i) => {
                return i != index;
            })
        },
        add() {
            this.todos.unshift({
                isCompleted: false,
                content: this.todo
            });
            this.todo = '';
        },
        remember(todo) { //设置一个变量存储被双击的todo
            this.cur = todo;
        },
        cancel() {
            this.cur = '';
        },
        esc() { //修改到一半想取消，如何恢复到之前的

        }
    },
    directives: {
        focus(el, bindings) {
            if (bindings.value) {
                el.focus();
            }
        }
    }
})