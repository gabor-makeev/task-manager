<?php

namespace App\Http\Controllers;

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
    public function index(): InertiaResponse
    {
        $tasks = Task::where('user_id', Auth::id())->orderByDesc('created_at')->get();
        $statuses = Status::where('user_id', Auth::id())->get();

        return Inertia::render('Dashboard', [
            'tasks' => $tasks,
            'statuses' => $statuses
        ]);
    }

    public function show(Task $task): RedirectResponse | InertiaResponse
    {
        $tasks = Task::where('user_id', Auth::id())->orderByDesc('created_at')->get();
        $statuses = Status::where('user_id', Auth::id())->get();

        if ($task->user_id !== Auth::id()) {
            return Redirect::route('dashboard');
        }

        return Inertia::render('Dashboard', [
            'tasks' => $tasks,
            'statuses' => $statuses,
            'task' => $task
        ]);
    }

    public function create(): InertiaResponse
    {
        $tasks = Task::where('user_id', Auth::id())->orderByDesc('created_at')->get();
        $statuses = Status::where('user_id', Auth::id())->get();

        return Inertia::render('Dashboard', [
            'tasks' => $tasks,
            'statuses' => $statuses,
            'withNewTaskCreationForm' => true
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        Task::create([
            'name' => $request->post('name'),
            'description' => $request->post('description'),
            'user_id' => $request->post('user_id'),
            'status_id' => Status::where([
                'user_id' => Auth::id(),
                'type' => 'not started'
            ])->first()->id
        ]);

        return Redirect::route('dashboard')->with('task successfully created', 201);
    }

    public function update(Task $task): RedirectResponse
    {
        $task->update(\request()->only(['name', 'description', 'status_id']));

        return Redirect::back()->with('success', 'Task updated');
    }

    public function destroy(Task $task): RedirectResponse
    {
        $task->delete();

        return Redirect::route('dashboard')->with('success', 'Task deleted');
    }
}
