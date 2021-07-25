const {
    interval,
    fromEvent,
    combineLatest,
    BehaviorSubject,
    subscribe,
    from,
    Observable,
    of,
} = rxjs;
const { scan, startWith, map, takeWhile, switchMap, pipe } = rxjs.operators;

const intervalSubject = new BehaviorSubject(600);

// 1. create observable from UI events
const btn = document.getElementById("btn");
const btnStream$ = fromEvent(btn, "click");
btnStream$.subscribe(
    (e) => {
        console.log("clicked!", e);
    },
    (error) => {
        console.log(error);
    },
    () => {
        console.log("completed.");
    }
);

const input = document.getElementById("input");
const outputDiv = document.getElementById("output");
const inputStream$ = fromEvent(input, "keyup");
inputStream$.subscribe(
    (e) => {
        console.log("key up~~!", e);
        outputDiv.append(e.target.value);
    },
    (error) => {
        console.log(error);
    },
    () => {
        console.log("completed.");
    }
);

const moveStream$ = fromEvent(document, "mousemove");
moveStream$.subscribe(
    (e) => {
        // outputDiv.innerHTML = `X: ${e.clientX}, Y: ${e.clientY}`;
    },
    (error) => {
        console.log(error);
    },
    () => {
        console.log("completed.");
    }
);

// 2. create observable from array
const numbers = [10, 20, 30, 40, 50, 60];
const numbers$ = from(numbers);
numbers$.subscribe(
    (value) => {
        console.log(value);
    },
    (error) => {
        console.log(error);
    },
    () => {
        console.log("completed~!~");
    }
);

const posts = [
    { title: "Post ONE", body: "this is the body" },
    { title: "Post TWO", body: "this is the body" },
    { title: "Post THREE", body: "this is the body" },
    { title: "Post FOUR", body: "this is the body" },
];
const postList = document.getElementById("posts");
const post$ = from(posts);
post$.subscribe(
    (post) => {
        console.log(post);
        const li = document.createElement("li");
        li.innerText = post.title;
        postList.appendChild(li);
    },
    (error) => {
        console.log(error);
    },
    () => {
        console.log("completed~!~");
    }
);

// 3. create observable from scratch
const source$ = new Observable((observer) => {
    console.log("creating observable......");
    // .next()로 값을 emit!
    observer.next("hello world");
    observer.next("another val");

    observer.error(new Error("error: somthing wen wrong"));

    observer.complete();
});
source$
    // .catchError((err) => of(err))
    .subscribe(
        (x) => {
            console.log(x);
        },
        (error) => {
            console.log(error);
        },
        (complete) => {
            console.log("completed~!~");
        }
    );

// 4. create observable from a promise
const myPromise = new Promise((resolve, reject) => {
    console.log("creating promise..");
    setTimeout(() => {
        resolve("Hello from promise");
    }, 3000);
});

// myPromise.then((response) => {
//     console.log(response);
// });

// 위에 .then 을 사용하는 것처럼 아래에서 subscribe로
// 할 수도 있다.
const sourcePromise$ = from(myPromise);
sourcePromise$.subscribe((val) => {
    console.log(val);
});

// fetch api
function getUser(username) {
    const url = `https://api.github.com/users/${username}`;
    return fetch(url);
}
const user$ = from(getUser("lyj-ooz")).pipe(switchMap((res) => res.json()));

user$.subscribe((result) => {
    console.log("result: ", result);
});

//
