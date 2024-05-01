<?php

namespace App\Http\Controllers;

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

        return Inertia::render('Dashboard', [
            'tasks' => $tasks
        ]);
    }

    public function create(): InertiaResponse
    {
        $tasks = Task::where('user_id', Auth::id())->orderByDesc('created_at')->get();

        return Inertia::render('Dashboard', [
            'tasks' => $tasks,
            'withNewTaskCreationForm' => true
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        Task::create([
            'name' => $request->post('name'),
            'description' => $request->post('description'),
            'user_id' => $request->post('user_id')
        ]);

        return Redirect::route('dashboard')->with('task successfully created', 201);
    }
}
