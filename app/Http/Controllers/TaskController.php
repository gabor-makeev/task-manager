<?php

namespace App\Http\Controllers;

use App\Models\Priority;
use App\Models\Status;
use App\Models\Task;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class TaskController extends Controller
{
    private const PER_PAGE = 15;

    public function index(): InertiaResponse
    {
        $showClosedFiltering = \request()->exists('show-closed-filtering');
        $prioritySorting = \request()->get('priority-sorting');

        $closedStatusId = Auth::user()->statuses()->where('type', 'closed')->first()->id;

        $query = Task::where('user_id', Auth::id())->where('parent_task_id', null);

        if (!$showClosedFiltering) {
            $query->where('status_id', '!=', $closedStatusId);
        }

        if (!in_array($prioritySorting, ['desc', 'asc'])) {
            $query->orderByDesc('created_at');
        } else {
            $query->leftJoin('priorities', 'priorities.id', '=', 'tasks.priority_id')
                ->orderBy('priorities.value', $prioritySorting);
        }

        $tasks = $query->paginate($this::PER_PAGE, ['tasks.*']);
        $statuses = Status::where('user_id', Auth::id())->get();
        $priorities = Priority::orderByDesc('value')->get();

        return Inertia::render('Dashboard', [
            'tasks' => $tasks,
            'statuses' => $statuses,
            'priorities' => $priorities
        ]);
    }

    public function show(Task $task): RedirectResponse | InertiaResponse
    {
        $showClosedFiltering = \request()->exists('show-closed-filtering');
        $prioritySorting = \request()->get('priority-sorting');

        $closedStatusId = Auth::user()->statuses()->where('type', 'closed')->first()->id;

        $query = Task::where('user_id', Auth::id())->where('parent_task_id', null);

        if (!$showClosedFiltering) {
            $query->where('status_id', '!=', $closedStatusId);
        }

        if (!in_array($prioritySorting, ['desc', 'asc'])) {
            $query->orderByDesc('created_at');
        } else {
            $query->leftJoin('priorities', 'priorities.id', '=', 'tasks.priority_id')
                ->orderBy('priorities.value', $prioritySorting);
        }

        $tasks = $query->paginate($this::PER_PAGE, ['tasks.*']);
        $statuses = Status::where('user_id', Auth::id())->get();
        $priorities = Priority::orderByDesc('value')->get();

        if ($task->user_id !== Auth::id()) {
            return Redirect::route('dashboard');
        }

        $subtasks = $task->children()->get();

        $parent = $task->parent()->first();

        return Inertia::render('Dashboard', [
            'tasks' => $tasks,
            'statuses' => $statuses,
            'task' => $task,
            'priorities' => $priorities,
            'subtasks' => $subtasks,
            'parent' => $parent
        ]);
    }

    public function create(): InertiaResponse
    {
        $showClosedFiltering = \request()->exists('show-closed-filtering');
        $prioritySorting = \request()->get('priority-sorting');

        $closedStatusId = Auth::user()->statuses()->where('type', 'closed')->first()->id;

        $query = Task::where('user_id', Auth::id())->where('parent_task_id', null);

        if (!$showClosedFiltering) {
            $query->where('status_id', '!=', $closedStatusId);
        }

        if (!in_array($prioritySorting, ['desc', 'asc'])) {
            $query->orderByDesc('created_at');
        } else {
            $query->leftJoin('priorities', 'priorities.id', '=', 'tasks.priority_id')
                ->orderBy('priorities.value', $prioritySorting);
        }

        $tasks = $query->paginate($this::PER_PAGE, ['tasks.*']);
        $statuses = Status::where('user_id', Auth::id())->get();
        $priorities = Priority::orderByDesc('value')->get();

        return Inertia::render('Dashboard', [
            'tasks' => $tasks,
            'statuses' => $statuses,
            'withNewTaskCreationForm' => true,
            'priorities' => $priorities
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        Task::create([
            'name' => $request->post('name'),
            'description' => $request->post('description'),
            'user_id' => $request->post('user_id'),
            'parent_task_id' => $request->post('parent_task_id'),
            'status_id' => Status::where([
                'user_id' => Auth::id(),
                'type' => 'not started'
            ])->first()->id
        ]);

        if ($request->post('parent_task_id')) {
            return Redirect::back()->with('task successfully created', 201);
        }

        return Redirect::route('dashboard', \request()->getQueryString())->with('task successfully created', 201);
    }

    public function update(Task $task): RedirectResponse
    {
        $data = \request()->only(['name', 'description', 'status_id', 'priority_id']);
        $newTaskStatus = Status::find($data['status_id']);
        $isNewTaskStatus = $newTaskStatus->id !== $task->status->id;

        if ($isNewTaskStatus && $newTaskStatus->type === 'closed') {
            $data['closed_at'] = (string) now();
        }

        if ($newTaskStatus->type !== 'closed') {
            $data['closed_at'] = null;
        }

        $task->update($data);

        return Redirect::back()->with('success', 'Task updated');
    }

    public function destroy(Task $task): RedirectResponse
    {
        $task->delete();

        return Redirect::route('dashboard', \request()->getQueryString())->with('task successfully deleted', 201);
    }
}
