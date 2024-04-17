import { Instagram, Mails ,Github } from 'lucide-react';
const Footer = () => {
  return (
    <footer className="mt-5 w-full bg-slate-400 flex flex-col overflow-hidden place-items-center p-3 ">
        <div className="flex gap-10">
            <Instagram size={30} cursor={'pointer'}/>
            <Mails size={30} cursor={'pointer'}/>
            <Github size={30} cursor={'pointer'}/>
        </div>
        <h1 className="font-bold">| &copy; 2024 copyright : Raja Salsabilla Annatasya |</h1>
    </footer>
  );
};

export default Footer;
