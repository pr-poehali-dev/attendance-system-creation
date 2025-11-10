import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

interface Employee {
  id: string;
  name: string;
  position: string;
  department: string;
  hourlyRate: number;
  status: 'active' | 'inactive';
}

interface Department {
  id: string;
  name: string;
  employeeCount: number;
}

interface Attendance {
  id: string;
  employeeId: string;
  employeeName: string;
  date: string;
  checkIn: string;
  checkOut: string;
  hoursWorked: number;
  salary: number;
}

const Index = () => {
  const [employees, setEmployees] = useState<Employee[]>([
    { id: '1', name: 'Анна Иванова', position: 'Менеджер', department: 'Продажи', hourlyRate: 500, status: 'active' },
    { id: '2', name: 'Петр Смирнов', position: 'Разработчик', department: 'IT', hourlyRate: 800, status: 'active' },
    { id: '3', name: 'Мария Кузнецова', position: 'Дизайнер', department: 'Маркетинг', hourlyRate: 600, status: 'active' },
    { id: '4', name: 'Иван Попов', position: 'Аналитик', department: 'IT', hourlyRate: 700, status: 'active' },
  ]);

  const [departments] = useState<Department[]>([
    { id: '1', name: 'Продажи', employeeCount: 1 },
    { id: '2', name: 'IT', employeeCount: 2 },
    { id: '3', name: 'Маркетинг', employeeCount: 1 },
  ]);

  const [attendance, setAttendance] = useState<Attendance[]>([
    { id: '1', employeeId: '1', employeeName: 'Анна Иванова', date: '2025-11-10', checkIn: '09:00', checkOut: '18:00', hoursWorked: 8, salary: 4000 },
    { id: '2', employeeId: '2', employeeName: 'Петр Смирнов', date: '2025-11-10', checkIn: '09:15', checkOut: '18:30', hoursWorked: 8.25, salary: 6600 },
    { id: '3', employeeId: '3', employeeName: 'Мария Кузнецова', date: '2025-11-10', checkIn: '10:00', checkOut: '19:00', hoursWorked: 8, salary: 4800 },
  ]);

  const [newEmployee, setNewEmployee] = useState({ name: '', position: '', department: '', hourlyRate: '' });
  const [isAddEmployeeOpen, setIsAddEmployeeOpen] = useState(false);

  const addEmployee = () => {
    if (newEmployee.name && newEmployee.position && newEmployee.department && newEmployee.hourlyRate) {
      const employee: Employee = {
        id: Date.now().toString(),
        name: newEmployee.name,
        position: newEmployee.position,
        department: newEmployee.department,
        hourlyRate: parseFloat(newEmployee.hourlyRate),
        status: 'active',
      };
      setEmployees([...employees, employee]);
      setNewEmployee({ name: '', position: '', department: '', hourlyRate: '' });
      setIsAddEmployeeOpen(false);
    }
  };

  const addAttendance = (employeeId: string) => {
    const employee = employees.find(e => e.id === employeeId);
    if (!employee) return;

    const now = new Date();
    const checkIn = '09:00';
    const checkOut = '18:00';
    const hoursWorked = 8;

    const newAttendance: Attendance = {
      id: Date.now().toString(),
      employeeId: employee.id,
      employeeName: employee.name,
      date: now.toISOString().split('T')[0],
      checkIn,
      checkOut,
      hoursWorked,
      salary: hoursWorked * employee.hourlyRate,
    };

    setAttendance([newAttendance, ...attendance]);
  };

  const totalEmployees = employees.length;
  const activeEmployees = employees.filter(e => e.status === 'active').length;
  const todayAttendance = attendance.filter(a => a.date === new Date().toISOString().split('T')[0]).length;
  const todaySalary = attendance
    .filter(a => a.date === new Date().toISOString().split('T')[0])
    .reduce((sum, a) => sum + a.salary, 0);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-primary rounded-lg p-2">
                <Icon name="ClipboardCheck" className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Система учёта</h1>
                <p className="text-sm text-muted-foreground">Управление посещаемостью и зарплатой</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Сегодня</p>
                <p className="font-semibold">{new Date().toLocaleDateString('ru-RU')}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 animate-fade-in">
          <Card className="hover-scale">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Всего сотрудников</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold">{totalEmployees}</div>
                <div className="bg-primary/10 rounded-full p-3">
                  <Icon name="Users" className="text-primary" size={24} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover-scale">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Активных</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold text-green-600">{activeEmployees}</div>
                <div className="bg-green-100 rounded-full p-3">
                  <Icon name="UserCheck" className="text-green-600" size={24} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover-scale">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Посещений сегодня</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold text-blue-600">{todayAttendance}</div>
                <div className="bg-blue-100 rounded-full p-3">
                  <Icon name="Calendar" className="text-blue-600" size={24} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover-scale">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Зарплата сегодня</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold text-purple-600">{todaySalary.toLocaleString()} ₽</div>
                <div className="bg-purple-100 rounded-full p-3">
                  <Icon name="DollarSign" className="text-purple-600" size={24} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="employees" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="employees">Сотрудники</TabsTrigger>
            <TabsTrigger value="departments">Отделы</TabsTrigger>
            <TabsTrigger value="attendance">Посещения</TabsTrigger>
          </TabsList>

          <TabsContent value="employees" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Управление сотрудниками</CardTitle>
                    <CardDescription>База данных всех сотрудников компании</CardDescription>
                  </div>
                  <Dialog open={isAddEmployeeOpen} onOpenChange={setIsAddEmployeeOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <Icon name="Plus" className="mr-2" size={16} />
                        Добавить сотрудника
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Новый сотрудник</DialogTitle>
                        <DialogDescription>Добавьте нового сотрудника в систему</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 pt-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">ФИО</Label>
                          <Input
                            id="name"
                            placeholder="Иван Иванов"
                            value={newEmployee.name}
                            onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="position">Должность</Label>
                          <Input
                            id="position"
                            placeholder="Менеджер"
                            value={newEmployee.position}
                            onChange={(e) => setNewEmployee({ ...newEmployee, position: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="department">Отдел</Label>
                          <Select
                            value={newEmployee.department}
                            onValueChange={(value) => setNewEmployee({ ...newEmployee, department: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Выберите отдел" />
                            </SelectTrigger>
                            <SelectContent>
                              {departments.map((dept) => (
                                <SelectItem key={dept.id} value={dept.name}>
                                  {dept.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="hourlyRate">Ставка в час (₽)</Label>
                          <Input
                            id="hourlyRate"
                            type="number"
                            placeholder="500"
                            value={newEmployee.hourlyRate}
                            onChange={(e) => setNewEmployee({ ...newEmployee, hourlyRate: e.target.value })}
                          />
                        </div>
                        <Button onClick={addEmployee} className="w-full">
                          Добавить
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ФИО</TableHead>
                      <TableHead>Должность</TableHead>
                      <TableHead>Отдел</TableHead>
                      <TableHead>Ставка/час</TableHead>
                      <TableHead>Статус</TableHead>
                      <TableHead>Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {employees.map((employee) => (
                      <TableRow key={employee.id}>
                        <TableCell className="font-medium">{employee.name}</TableCell>
                        <TableCell>{employee.position}</TableCell>
                        <TableCell>{employee.department}</TableCell>
                        <TableCell>{employee.hourlyRate} ₽</TableCell>
                        <TableCell>
                          <Badge variant={employee.status === 'active' ? 'default' : 'secondary'}>
                            {employee.status === 'active' ? 'Активен' : 'Неактивен'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => addAttendance(employee.id)}
                          >
                            <Icon name="Clock" className="mr-2" size={14} />
                            Отметить
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="departments" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Структура отделов</CardTitle>
                <CardDescription>Подразделения компании</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {departments.map((dept) => (
                    <Card key={dept.id} className="hover-scale">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Icon name="Building2" className="text-primary" size={20} />
                          {dept.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Сотрудников:</span>
                            <span className="font-semibold">{dept.employeeCount}</span>
                          </div>
                          <Button variant="outline" size="sm" className="w-full">
                            <Icon name="Eye" className="mr-2" size={14} />
                            Просмотр
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="attendance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Журнал посещений</CardTitle>
                <CardDescription>История учёта рабочего времени и расчёт зарплаты</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Дата</TableHead>
                      <TableHead>Сотрудник</TableHead>
                      <TableHead>Приход</TableHead>
                      <TableHead>Уход</TableHead>
                      <TableHead>Часов</TableHead>
                      <TableHead>Зарплата</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {attendance.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell>{new Date(record.date).toLocaleDateString('ru-RU')}</TableCell>
                        <TableCell className="font-medium">{record.employeeName}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-green-50">
                            <Icon name="LogIn" className="mr-1" size={12} />
                            {record.checkIn}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-red-50">
                            <Icon name="LogOut" className="mr-1" size={12} />
                            {record.checkOut}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">{record.hoursWorked} ч</Badge>
                        </TableCell>
                        <TableCell className="font-semibold text-green-600">
                          {record.salary.toLocaleString()} ₽
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;