const vm = new Vue({
    el: '#app',
    data: {
        todo: '',
        cur: '',
        todos: [{
                isCompleted: false,
                content: '这是第1条',
            },
            {
                isCompleted: false,
                content: '这是第2条',
            },
            {
                isCompleted: false,
                content: '这是第3条',
            },
            {
                isCompleted: false,
                content: '这是第4条',
            },
        ],
        hash: '',
    },
    created() { //应用于ajax获取 初始化数据
        //如果localStorage有数据就用有的，没有就用默认的
        this.todos = JSON.parse(localStorage.getItem('data')) || this.todos;
        //监听hash值的变化
        this.hash = window.location.hash.slice(2) || '';
        window.addEventListener('hashchange', () => {
            //当hash变化，重新操作记录的数据
            this.hash = window.location.hash.slice(2);
        }, false);
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
        },
        filterTodos() {
            if (this.hash === 'all') {
                return this.todos;
            }
            if (this.hash === 'finish') {
                return this.todos.filter(item => item.isCompleted);
            }
            if (this.hash === 'unfinish') {
                return this.todos.filter(item => !item.isCompleted);
            }
            //如果锚点是乱输入的，默认输出所有todo
            return this.todos;
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